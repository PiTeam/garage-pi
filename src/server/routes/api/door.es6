import { Router as router } from 'express';
import * as doorRepository from '../../repositories/door';
import * as doorService from '../../services/door';
import { ensureAuthenticated } from '../../lib/auth';

const routes = router();

routes.get('/', (req, res) => {
  doorRepository.loadDoors().then(doors => {
    const responseDoors = doors.map(door => {
      return {
        id: door.id,
        name: door.name,
        actionGpioPin: door.actionGpioPin,
        statusGpioPin: door.statusGpioPin,
        status: doorService.getStatus(door),
      };
    });
    return res.send(responseDoors);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/:doorId/status', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.getStatus(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/toggle', ensureAuthenticated, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.toggle(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/open', ensureAuthenticated, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.open(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/close', ensureAuthenticated, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.close(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
