var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  entry: [path.join(__dirname, '/../app/app.jsx')],
  resolve: {
    root: path.resolve('../app'),    
    extensions: ['', '.js', '.jsx', '.es6'],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: 'app.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: path.resolve(__dirname, '../www') },      
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "../app")],
        exclude: [path.resolve(__dirname, '../../node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loaders: ['babel'],
        exclude: [path.resolve(__dirname, '../../node_modules')],
      },
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};

module.exports = config;
