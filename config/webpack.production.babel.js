import path from 'path';
import config from 'config';
const endpoints = config.get('api');

module.exports = {
  entry: [
    path.join(__dirname, '../src/frontend/app/main.js'),
  ],
  resolve: {
    root: path.join(__dirname, '../src/frontend/app'),
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
};
