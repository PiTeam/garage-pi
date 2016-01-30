import express from 'express';
import morgan from 'morgan';
import config from 'config';
import bodyParser from 'body-parser';
import DB from './backend/lib/db';
import cors from 'cors';

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

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
});
