import webpack from 'webpack';
import path from 'path';
import config from 'config';
const endpoints = config.get('api');

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/frontend/main.js'),
    vendor: [
      'react',
      'redux',
      'react-redux',
      'react-dom',
      'react-tap-event-plugin',
      'material-ui',
      'react-router',
      'redux-thunk',
      'redux-actions',
      'redux-logger',
      'history',
      'immutable',
    ],
  },
  resolve: {
    root: path.join(__dirname, '../src/frontend'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: 'app.js',
  },
  externals: [
    {
      endpoints: JSON.stringify(endpoints),
    },
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  ],
};
