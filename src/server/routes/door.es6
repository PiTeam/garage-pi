import { Router as router } from 'express';
import * as doorRepository from '../repositories/door';
import * as doorService from '../services/door';

const routes = router();

routes.get('/:doorId/status', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.getStatus(door));
  });
});

routes.get('/:doorId/toggle', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.toggle(door));
  });
});

routes.get('/:doorId/open', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.open(door));
  });
});

routes.get('/:doorId/close', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.close(door));
  });
});

export default routes;
