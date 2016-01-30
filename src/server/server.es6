import express from 'express';
import morgan from 'morgan';
import config from 'config';
import bodyParser from 'body-parser';
import DB from './lib/db';
import cors from 'cors';

const PORT = config.get('express.port') || 3000;

import routes from './routes';

const app = express();

if (config.get('express.cors')) {
  app.use(cors());
}
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use('/', routes);

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
});
