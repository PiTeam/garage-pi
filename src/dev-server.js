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
import configWebpackDevServer from '../webpack/webpack.dev.babel';

const PORT = config.get('express.port') || 3000;

import apiRoutes from './backend/routes/api';

const app = express();
app.use('/static', express.static(`${__dirname}/static`));

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
  contentBase: `${__dirname}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
  publicPath: '/static',
  historyApiFallback: true,
  devtool: 'eval',
  hot: true,
  inline: true,
  stats: { colors: true },
  port: 8081,
});

app.use('/static', proxy(url.parse('http://localhost:8081/static/')));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/static/index.html`));
server.listen(8081, 'localhost');

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
});
