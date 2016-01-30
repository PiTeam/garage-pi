import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './config/webpack-dev-server';
import express from 'express';
import proxy from 'proxy-middleware';
import url from 'url';

const app = express();
app.use('/assets', proxy(url.parse('http://localhost:8081/assets')));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/www/index.html`));

const server = new WebpackDevServer(webpack(config), {
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

server.listen(8081, "localhost");
app.listen(8080);
console.log('Ok, listening 8080 port.');
