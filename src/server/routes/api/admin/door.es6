import { Router as router } from 'express';
import * as doorRepository from '../../../repositories/door';
import { adminOnly } from '../../../lib/auth';
import * as userRepository from '../../../repositories/user';

const routes = router();

routes.get('/', adminOnly, (req, res) => {
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
  doorRepository.updateDoor(req.body.door).then(door => {
    const desiredUsersIds = req.body.door.users;
    userRepository.loadUsersWithDoor(door.id).then(actualDoorUsers => {
      const actualUsersIds = actualDoorUsers.map(d => d._id);

      const promises = [];
      actualUsersIds.map(actualUserId => {
        if (desiredUsersIds.indexOf(actualUserId) === -1) {
          promises.push(userRepository.removeDoorFromUser(actualUserId, door.id));
        }
      });

      desiredUsersIds.map(desiredUserId => {
        if (actualUsersIds.indexOf(desiredUserId) === -1) {
          promises.push(userRepository.addDoorToUser(desiredUserId, door.id));
        }
      });

      Promise.all(promises).then(() => {
        res.status(200).send({ status: 'ok' });
      });
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
