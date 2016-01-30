var webpack = require('webpack');
var config = require('config');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var endpoints = config.get('api');

var config = {
  entry: [path.join(__dirname, '../src/frontend/app/app.jsx')],
  resolve: {
    root: path.join(__dirname, '../src/frontend/app'),
    extensions: ['', '.js', '.jsx', '.es6'],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: path.resolve(__dirname, '../src/frontend/www') },
    ]),
  ],
  externals: [
    {
      endpoints: JSON.stringify(endpoints),
    },
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "../src/frontend/app")],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loaders: ['babel'],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};

module.exports = config;
