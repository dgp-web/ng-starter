const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');

module.exports = setTypeScriptAlias(require('./tsconfig.json'), {
    mode: 'development',
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: {
        main: ['./karma-tests.js']
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: '[name].js',
        publicPath: '/dist/'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.e2e\.ts$/],
                loaders: [
                    'awesome-typescript-loader?{ configFileName: "./tsconfig.spec.json", useTranspileModule: true, transpileOnly: true, useCache: true, cacheDirectory: ".awcache-test" }',
                    'angular2-template-loader'
                ]
            },

            {test: /\.html$/, loader: 'raw-loader'},

            {test: /\.css/, loader: 'raw-loader'},

            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },

    plugins: [

        new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './src')),

    ],

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});

function setTypeScriptAlias(tsConfig, config) {
    var newConfig = clone(config);
    newConfig = newConfig || {};
    newConfig.resolve = newConfig.resolve || {};
    newConfig.resolve.alias = newConfig.resolve.alias || {};
    var tsPaths = tsConfig.compilerOptions.paths;
    for (var prop in tsPaths) {
        newConfig.resolve.alias[prop] = root(tsPaths[prop][0]);
    }
    return newConfig;
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}