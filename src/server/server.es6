import express from 'express';
import config from 'config';
import path from 'path';

const port = config.get('express.port') || 3000;
const VIEWS_DIR = path.join(__dirname, 'views');
const ROUTES_DIR = path.join(__dirname, 'routes');
const STATIC_DIR = path.join(__dirname, '..', 'client', 'dist');

import routes from './routes';

let app = express();
app.use('/', routes);

app.listen(port);