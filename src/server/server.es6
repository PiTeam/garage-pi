import express from 'express';
import config from 'config';

const port = config.get('express.port') || 3000;

let app = express();
app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port);