const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
                    loaders: [{
                      loader: 'ts-loader',
                      options: {
                        transpileOnly: true,
                        configFile: "tsconfig.app.json"
                      }
                    }, {
                      loader: 'angular2-template-loader',
                    }]
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

            new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname, 'src'), {}),

            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('./wwwroot/vendor-manifest.json')
            }),

            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(distDirectory, '[resourcePath]')
            }),

            new HardSourceWebpackPlugin()
        ],

    });

};
