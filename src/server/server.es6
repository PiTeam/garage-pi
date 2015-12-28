import express from 'express';
import config from 'config';
import routes from './routes';

const port = config.get('express.port') || 3000;
let app = express();
app.use(routes);

app.listen(port);