/* eslint no-console: 0 */

import express from 'express';
import morgan from 'morgan';
import config from 'config';
import bodyParser from 'body-parser';
import DB from './backend/lib/db';
import cors from 'cors';
import webpack from 'webpack';
import proxy from 'proxy-middleware';
import url from 'url';
import WebpackDevServer from 'webpack-dev-server';
import configWebpackDevServer from '../config/webpack-dev-server';

const PORT = config.get('express.port') || 3000;

import apiRoutes from './backend/routes/api';

const app = express();
app.use('/assets', express.static(`${__dirname}/frontend/www/assets`));

if (config.get('express.cors')) {
  app.use(cors());
}
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/api', apiRoutes);

const server = new WebpackDevServer(webpack(configWebpackDevServer), {
  contentBase: `${__dirname}/www`,
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: '/assets/',
  historyApiFallback: true,
  devtool: 'eval',
  hot: true,
  inline: true,
  stats: { colors: true },
  port: 8081,
});

app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));
app.use('/app.js', proxy(url.parse('http://localhost:8081/assets/app.js')));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/frontend/www/index.html`));
server.listen(8081, 'localhost');

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
});
