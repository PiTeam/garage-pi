import express from "express";

let routes = express.Router(),
    doorService = require('../services/door');

routes.get('/', (req, res) => {
    res.send('hello world');
});

routes.get('/api/door/:doorId/status', (req, res) => {
    var doorId = req.params.doorId;    
    res.send(doorService.getStatus(doorId));
});

routes.get('api/door/:doorId/toogle', (req, res) => {
    var doorId = req.params.doorId;    
    res.send(doorService.toogle(doorId));
});

export default routes;