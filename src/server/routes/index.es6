import express from 'express';
import doorRoutes from './door';

const router = express.Router();

// Add new REST Endpoints here
router.use('/api/door', doorRoutes);

// Default response, REMOVE when ready
router.get('/', (req, res) => {
  res.render('index');
});

export default router;
