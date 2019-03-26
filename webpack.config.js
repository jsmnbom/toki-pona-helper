const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const packageJson = require('./package.json');
const exec = require('sync-exec');

module.exports = (env, argv) => {
    console.log("mode", argv.mode);
    const devMode = argv.mode === 'development';
    const dist = path.resolve(__dirname, 'dist');

    const pugHtml = {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src/pug/html'),
        use: [{
            loader: 'html-loader',
        }, {
            loader: 'pug-html-loader',
            options: {
                data: {
                    baseHref: devMode ? '/' : packageJson['prodBaseHref'],
                    revision: exec('git log \'--format=format:%H\' master -1').stdout
                }
            }
        }]
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
        exclude: /node_modules/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                experimentalWatchApi: true,
            },
        }]
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
        dictionary: {
            chunks: ['common', 'dictionary']
        },
        sitelenPonaConverter: {
            chunks: ['common', 'sitelenPonaConverter']
        },
    };

    return ({
        entry: {
            common: './src/js/common.ts',
            tutor: './src/js/tutor/index.ts',
            dictionary: './src/js/dictionary.ts',
            sitelenPonaConverter: './src/js/sitelenPonaConverter.ts',
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
            new WebappWebpackPlugin('./src/img/logo.svg'),
            new PurgecssPlugin({
                paths: glob.sync(`${path.join(__dirname, 'src/pug')}/**/*`, {nodir: true}),
            }),
        ],
        optimization: {
            minimizer: devMode ? [] : [
                new TerserJSPlugin({
                    cache: true,
                    parallel: true,
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            splitChunks: {
                chunks: 'all'
            }
        },
        devServer: {
            contentBase: dist
        },
    })
};