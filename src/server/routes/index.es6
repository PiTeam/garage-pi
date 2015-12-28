import express from "express";

let routes = express.Router();

routes.get('/', (req, res) => {
    res.send('hello world');
});

export default routes;