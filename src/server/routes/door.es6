import express from "express";

let router = express.Router();

router.get('/:id/status', (req, res) => {
    res.send('hello world status');
});

router.put('/:id/toggle', (req, res) => {
    res.send('hello world');    
});

export default router;