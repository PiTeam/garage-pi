import { Router as router } from 'express';
import * as doorService from '../services/doorService';

const routes = router();

routes.get('/:doorId/status', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.getStatus(doorId));
});

routes.get('/:doorId/toogle', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.toogle(doorId));
});

export default routes;
