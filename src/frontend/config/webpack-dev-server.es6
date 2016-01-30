import webpack from 'webpack';
import path from 'path';
import TransferWebpackPlugin from 'transfer-webpack-plugin';

const endpoints = require('../app/config/endpoints-server');
export default {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/../app/app.jsx'),
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8081',
  ],
  resolve: {
    root: path.join(__dirname, '../app'),
    extensions: ['', '.js', '.jsx', '.es6'],
  },
  output: {
    path: path.resolve(__dirname, '/../www/assets'),
    publicPath: 'http://localhost:8081/assets',
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, "..")),
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
        include: [path.resolve(__dirname, "../app")],
        exclude: [path.resolve(__dirname, '../../../node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loaders: ['react-hot', 'babel'],
        exclude: [path.resolve(__dirname, '../../../node_modules')],
      },
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};
