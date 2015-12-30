import { Router as router } from 'express';
import * as doorService from '../services/door';

const routes = router();

routes.get('/:doorId/status', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.getStatus(doorId));
});

routes.get('/:doorId/toggle', (req, res) => {
  const doorId = req.params.doorId;
  res.send(doorService.toggle(doorId));
});

export default routes;
