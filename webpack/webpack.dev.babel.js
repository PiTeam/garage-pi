import webpack from 'webpack';
import path from 'path';
import config from 'config';

const endpoints = config.get('api');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/frontend/main.js'),
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8081',
  ],
  resolve: {
    root: path.join(__dirname, '../src/frontend'),
  },
  output: {
    path: path.resolve(__dirname, '../src/static'),
    publicPath: '/static',
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  externals: [
    {
      endpoints: JSON.stringify(endpoints),
    },
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../src/frontend')],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
  },
};
