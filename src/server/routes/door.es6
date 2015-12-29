import express from "express";

let router = express.Router();
let doorService = require('../services/door');

router.get('/:doorId/status', (req, res) => {
    let doorId = req.params.doorId;    
    res.send(doorService.getStatus(doorId));
});

router.get('/:doorId/toogle', (req, res) => {
    let doorId = req.params.doorId;    
    res.send(doorService.toogle(doorId));
});

export default router;