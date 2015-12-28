import express from "express";
import door_routes from './door';

let routes = express.Router(),
    doorService = require('../services/door');
let router = express.Router();

router.use('/door', door_routes);

routes.get('/api/door/:doorId/status', (req, res) => {
    var doorId = req.params.doorId;    
    res.send(doorService.getStatus(doorId));
});

routes.get('api/door/:doorId/toogle', (req, res) => {
    var doorId = req.params.doorId;    
    res.send(doorService.toogle(doorId));
});

export default routes;
