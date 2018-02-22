var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'toguro.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'toguro',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        }
      }, {
        loader: 'standard-loader',
        options: {
          snazzy: true
        }
      }]
    }],
  }
}
