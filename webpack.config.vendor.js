const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

        stats: { modules: false },
        mode: 'development',
        resolve: {
            extensions: ['.js']
        },
        entry: {
            vendor: [
                'core-js/shim',
                'zone.js/dist/zone',
                'event-source-polyfill',
                'rxjs',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
            ]
        },
        output: {
            filename: '[name].js',
            library: '[name]_[hash]',
            publicPath: '/',
            path: path.join(__dirname, 'wwwroot')
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './Client')),
            new webpack.IgnorePlugin(/^vertx$/),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new CopyWebpackPlugin([])
        ]

};
