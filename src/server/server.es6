import express from 'express';
import morgan from 'morgan';
import config from 'config';
import bodyParser from 'body-parser';
import path from 'path';
import DB from './lib/db';

const PORT = config.get('express.port') || 3000;
const STATIC_DIR = path.join(__dirname, '..', 'static');
const VIEWS_DIR = path.join(__dirname, 'views');

import routes from './routes';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('views', VIEWS_DIR);
app.set('view engine', 'jade');
app.use(express.static(STATIC_DIR));
app.use('/', routes);

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  app.listen(PORT);
  console.log('Server listening on port ' + PORT);
});
