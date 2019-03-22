const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pugHtml = {
    test: /\.pug$/,
    include: path.resolve(__dirname, 'src/pug/html'),
    use: ['html-loader?attrs[]=img:src', 'pug-html-loader']
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
    loader: 'url-loader?limit=1024&name=img/[name].[ext]'
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
            name: '[name].[ext]',
            outputPath: 'font',
            publicPath: '../font'
        },
    }],
};

const pages = ['index', 'tutor', 'about'];

const dist = path.resolve(__dirname, 'dist');

// noinspection JSUnusedGlobalSymbols
module.exports = {
    entry: {
        style: './src/css/style.js',
        common: './src/js/common.ts',
        tutor: './src/js/tutor.ts'
    },
    devtool: 'source-map',
    output: {
        path: dist,
        filename: 'js/[name].bundle.js',
        chunkFilename: "js/[name].chunk.js"
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
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        ...pages.map(page => new HtmlWebpackPlugin({
            filename: page + '.html',
            template: './src/pug/html/' + page + '.pug',
            inject: false
        })),
        new WebappWebpackPlugin('./src/img/logo.svg')
    ],
    devServer: {
        contentBase: dist
    },
};