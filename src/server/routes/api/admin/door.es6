import { Router as router } from 'express';
import * as doorRepository from '../../../repositories/door';
import { adminOnly } from '../../../lib/auth';

const routes = router();

routes.get('/', (req, res) => {
  doorRepository.loadDoorsWithUsers().then(doors => {
    const publicInfoDoors = doors.map(door => ({
      id: door._id,
      name: door.name,
      image: door.image,
      users: door.users,
    }));
    return res.send(publicInfoDoors);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.delete('/:id', adminOnly, (req, res) => {
  doorRepository.deleteDoor(req.params.id).then(() => {
    res.status(200).send({ status: 'ok' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.put('/:id', adminOnly, (req, res) => {
  doorRepository.updateDoor(req.body.door).then(() => {
    res.status(200).send({ status: 'ok' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
