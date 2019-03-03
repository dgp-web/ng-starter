const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {

    const sharedConfig = {
        stats: { modules: false },
        mode: 'development',
        resolve: {
            extensions: ['.js']
        },
        entry: {
            vendor: [
                'core-js/shim',
                'reflect-metadata',
                'zone.js/dist/zone',
                'event-source-polyfill',
                'rxjs',
                '@angular/common',
                '@angular/animations',
                '@angular/compiler',
                '@angular/core',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
            ]
        },
        output: {
            filename: '[name].js',
            library: '[name]_[hash]',
            publicPath: '/'
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './Client')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.IgnorePlugin(/^vertx$/)
        ]
    };

    const clientConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot') },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new CopyWebpackPlugin([])
        ]
    });

    return [
        clientConfig
    ];

};
