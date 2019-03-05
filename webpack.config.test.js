const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');

module.exports = function(env) {

    const isDevBuild = env && env.development === true;
    const mode = isDevBuild ? "development" : "production";

      return setTypeScriptAlias(require('./tsconfig.json'), {
        mode: mode,
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
                }
            ]
        },

        plugins: [
          new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './src')),
        ].concat(isDevBuild ? [

          new webpack.DllReferencePlugin({
              context: '.',
              manifest: require('./wwwroot/vendor-manifest.json')
          }),

        ] : []),

        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
}
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
