const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const sharedConfig = require("./webpack.config.shared-app");

module.exports = function() {

    const distDirectory = './wwwroot';

    return webpackMerge(sharedConfig, {
        mode: 'development',
        devtool: false,
        devServer: {
            contentBase: path.join(__dirname, "wwwroot"),
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader?{ configFileName: "./tsconfig.app.json", useTranspileModule: true, transpileOnly: true, useCache: true, cacheDirectory: ".awcache-playground" }',
                        'angular2-template-loader',
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    use: [ {
                        loader: "raw-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                }
            ]
        },

        entry: {
            'main-playground': './src/main.playground.ts'
        },

        output: {
            publicPath: '/'
        },

        plugins: [

            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('./wwwroot/vendor-manifest.json')
            }),

            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(distDirectory, '[resourcePath]')
            })
        ],

    });

};
