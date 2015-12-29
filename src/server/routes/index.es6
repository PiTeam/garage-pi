import express from "express";
import door_routes from './door';

let router = express.Router();

// Add new REST Endpoints here
router.use('/api/door', door_routes);

// Default response, REMOVE when ready
router.get('/', (req, res) => {
    res.render('index');
});

export default router;
