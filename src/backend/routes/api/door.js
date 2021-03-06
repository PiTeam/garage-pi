import { Router as router } from 'express';
import * as doorRepository from '../../repositories/door';
import * as doorService from '../../services/door';
import { doorAuthorizationNeeded, authNeeded } from '../../lib/auth';

const routes = router();

routes.get('/', authNeeded, (req, res) => {
  doorRepository.loadDoorsByUser(req.user.userId).then(doors => {
    const publicInfoDoors = doors.map(door => ({
      id: door._id,
      name: door.name,
      image: door.image,
      actionGpioPin: door.actionGpioPin,
      statusGpioPin: door.statusGpioPin,
      status: doorService.getStatus(door),
    }));
    return res.send(publicInfoDoors);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/:doorId/status', (req, res) => {
  doorRepository.loadDoorById(req.params.doorId)
    .then(door => res.send(doorService.getStatus(door))
  ).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/:doorId/toggle', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => res.send(doorService.toggle(door))
  ).catch(err => res.status(500).send(err.message));
});

routes.post('/:doorId/open', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId).then(door => res.send(doorService.open(door))
  ).catch(err => res.status(500).send(err.message));
});

routes.post('/:doorId/close', doorAuthorizationNeeded, (req, res) => {
  doorRepository.loadDoorById(req.params.doorId)
    .then(door => res.send(doorService.close(door)))
    .catch(err => res.status(500).send(err.message)
  );
});

export default routes;
