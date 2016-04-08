import webpack from 'webpack';
import path from 'path';
import config from 'config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const endpoints = config.get('api');

module.exports = {
  entry: {
    main: path.join(__dirname, '../src/frontend/main.js'),
    vendor: [
      'material-ui/lib/app-bar',
      'material-ui/lib/avatar',
      'material-ui/lib/card/card',
      'material-ui/lib/card/card-media',
      'material-ui/lib/card/card-title',
      'material-ui/lib/checkbox',
      'material-ui/lib/dialog',
      'material-ui/lib/divider',
      'material-ui/lib/flat-button',
      'material-ui/lib/floating-action-button',
      'material-ui/lib/icon-button',
      'material-ui/lib/left-nav',
      'material-ui/lib/lists/list',
      'material-ui/lib/lists/list-item',
      'material-ui/lib/paper',
      'material-ui/lib/raised-button',
      'material-ui/lib/svg-icons/action/account-balance',
      'material-ui/lib/svg-icons/action/face',
      'material-ui/lib/svg-icons/action/home',
      'material-ui/lib/svg-icons/action/lock-open',
      'material-ui/lib/svg-icons/action/settings',
      'material-ui/lib/svg-icons/content/add',
      'material-ui/lib/svg-icons/content/add-circle-outline',
      'material-ui/lib/svg-icons/navigation/close',
      'material-ui/lib/tabs',
      'material-ui/lib/text-field',
      'react',
      'redux',
      'react-redux',
      'react-dom',
      'react-immutable-proptypes',
      'react-tap-event-plugin',
      'react-router',
      'redux-thunk',
      'redux-actions',
      'redux-logger',
      'history',
      'immutable',
      'qr-image',
      'base-64',
    ],
  },
  resolve: {
    root: path.join(__dirname, '../src/frontend'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/frontend'),
    filename: './static/js/[name].js',
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
    new HtmlWebpackPlugin({ template: 'src/static/index.ejs' }),
    new webpack.optimize.CommonsChunkPlugin('vendor', './static/js/vendor.js'),
  ],
};
