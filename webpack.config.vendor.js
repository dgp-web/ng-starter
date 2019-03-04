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
