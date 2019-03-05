const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const sharedConfig = require("./webpack.config.shared-app");

const distDirectory = './wwwroot';

module.exports = function(env) {

    const isDevBuild = env && env.development === true;
    const mode = isDevBuild ? "development" : "production";

    console.log('isDevBuild? ' + isDevBuild);

    return webpackMerge(sharedConfig, {
        mode: mode,

        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loaders: [
                    ].concat(isDevBuild ? [
                        'awesome-typescript-loader?{ configFileName: "./tsconfig.app.json", useTranspileModule: true, transpileOnly: true, useCache: true, cacheDirectory: ".awcache" }',
                        'angular2-template-loader',
                    ]: [
                        '@ngtools/webpack'
                    ])
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
            'main-client': './src/main.ts'
        },

        output: {
            publicPath: '/public/'
        },

        plugins: [].concat(isDevBuild ? [

            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require('./wwwroot/vendor-manifest.json')
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    'development': true
                }
            }),

            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(distDirectory, '[resourcePath]')
            })

        ] : [

            new webpack.DefinePlugin({
                'process.env': {
                    'production': true
                }
            }),

            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.app.json',
                entryModule: './src/app/app.module#AppModule',
                sourceMap: false
            })

        ])
    });
};
