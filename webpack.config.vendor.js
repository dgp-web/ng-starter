const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = {

  stats: {
    modules: false
  },
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  entry: {
    vendor: [
      'core-js/es6/symbol',
      'core-js/es6/object',
      'core-js/es6/function',
      'core-js/es6/parse-int',
      'core-js/es6/parse-float',
      'core-js/es6/number',
      'core-js/es6/math',
      'core-js/es6/string',
      'core-js/es6/date',
      'core-js/es6/array',
      'core-js/es6/regexp',
      'core-js/es6/map',
      'core-js/es6/set',
      'core-js/es6/reflect',
      'core-js/es7/reflect',
      'zone.js/dist/zone',
      'event-source-polyfill',
      'rxjs',
      'entity-store',
      '@angular/animations',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angularclass/hmr',
      '@ngrx/store',
      '@ngrx/effects',
      '@ngrx/store-devtools'
    ]
  },
  output: {
    filename: '[name].js',
    library: '[name]_[hash]',
    publicPath: '/',
    path: path.join(__dirname, 'wwwroot')
  },
  module: {
    rules: [{
      test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      parser: {system: true},
    }]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.join(__dirname, 'src'), {}),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'wwwroot', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]

};
