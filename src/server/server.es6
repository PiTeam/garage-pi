import express from 'express';
import config from 'config';
import path from 'path';

const PORT = config.get('express.port') || 3000;
const STATIC_DIR = path.join(__dirname, '..', 'static');
const VIEWS_DIR = path.join(__dirname, 'views');

import routes from './routes';

const app = express();
app.use('/', routes);
app.set('views', VIEWS_DIR);

app.set('view engine', 'jade');
app.use(express.static(STATIC_DIR));

app.listen(PORT);
