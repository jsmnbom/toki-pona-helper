const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJson = require('./package.json');

const devMode = process.env.NODE_ENV === 'development';

const pugHtml = {
    test: /\.pug$/,
    include: path.resolve(__dirname, 'src/pug/html'),
    use: [
        {
            loader: 'html-loader',
        },
        {
            loader: 'pug-html-loader',
            options: {
                data: {
                    baseHref: devMode ? '/' : packageJson['prodBaseHref']
                }
            }
        }
    ]
};

const pugTemplate = {
    test: /\.pug$/,
    include: path.resolve(__dirname, 'src/pug/template'),
    loader: 'pug-loader'
};

const scss = {
    test: /\.scss$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
    ]
};

const img = {
    test: /\.(jpg|jpeg|gif|png|svg)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 1024,
            name: 'img/[name].[contenthash].[ext]'
        }
    }]
};

const ts = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
};

const csv = {
    test: /\.csv$/,
    loader: 'csv-loader',
    options: {
        header: true,
        skipEmptyLines: true
    }
};

const font = {
    test: /\.woff$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'font',
            publicPath: '../font'
        },
    }],
};

const pages = {
    index: {
        chunks: ['common']
    },
    tutor: {
        chunks: ['common', 'tutor']
    },
    about: {
        chunks: ['common']
    },
};

const dist = path.resolve(__dirname, 'dist');

// noinspection JSUnusedGlobalSymbols
module.exports = {
    entry: {
        common: './src/js/common.ts',
        tutor: './src/js/tutor.ts',
    },
    devtool: devMode ? 'eval' : 'source-map',
    output: {
        path: dist,
        filename: 'js/[name].[contenthash].bundle.js',
        chunkFilename: "js/[name].[contenthash].chunk.js",
        publicPath: ''
    },
    module: {
        rules: [
            scss,
            pugHtml,
            pugTemplate,
            img,
            ts,
            csv,
            font
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[id].css"
        }),
        ...Object.entries(pages).map(([page, {chunks}]) => new HtmlWebpackPlugin({
            filename: page + '.html',
            template: './src/pug/html/' + page + '.pug',
            chunks: chunks,
        })),
        new WebappWebpackPlugin('./src/img/logo.svg')
    ],
    devServer: {
        contentBase: dist
    },
};