import express from 'express';
import * as doorService from '../services/doorService';

const router = express.Router();

router.get('/:doorId/status', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.getStatus(doorId));
});

router.get('/:doorId/toogle', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.toogle(doorId));
});

export default router;
