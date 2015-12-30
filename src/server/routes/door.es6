import { Router as router } from 'express';
import * as doorRepository from '../repositories/door';
import * as doorService from '../services/door';
import { ensureAuthenticated } from '../lib/auth-middleware';

const routes = router();

routes.get('/:doorId/status', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.getStatus(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/toggle', ensureAuthenticated, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.toggle(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/:doorId/open', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.open(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/:doorId/close', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    res.send(doorService.close(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
