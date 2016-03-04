/* eslint no-console: 0 */

import express from 'express';
import morgan from 'morgan';
import config from 'config';
import bodyParser from 'body-parser';
import DB from './backend/lib/db';
import cors from 'cors';

const PORT = config.get('express.port') || 3000;

import apiRoutes from './backend/routes/api';

const app = express();
app.use('/assets', express.static(`${__dirname}/frontend/assets`));
app.use('/app.js', express.static(`${__dirname}/frontend/app.js`));

if (config.get('express.cors')) {
  app.use(cors());
}
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/api', apiRoutes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/frontend/index.html`));

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
});
