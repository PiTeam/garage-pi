import { Router as router } from 'express';
import * as doorRepository from '../../repositories/door';
import * as doorService from '../../services/door';
import { doorAuthorizationNeeded } from '../../lib/auth';

const routes = router();

routes.get('/', doorAuthorizationNeeded, (req, res) => {
  const query = req.user.admin ? {} : {
    userId: req.user.userId,
  };
  doorRepository.loadDoors(query).then(doors => {
    const publicInfoDoors = doors.map(door => {
      return {
        id: door._id,
        name: door.name,
        actionGpioPin: door.actionGpioPin,
        statusGpioPin: door.statusGpioPin,
        status: doorService.getStatus(door),
      };
    });
    return res.send(publicInfoDoors);
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

routes.post('/:doorId/toggle', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.toggle(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/open', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.open(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/close', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => {
    return res.send(doorService.close(door));
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
