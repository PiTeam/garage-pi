import { Router as router } from 'express';
import * as doorRepository from '../../../repositories/door';
import { adminOnly } from '../../../lib/auth';

const routes = router();

routes.get('/', adminOnly, (req, res) => {
  doorRepository.loadDoors().then(doors => {
    const publicInfoDoors = doors.map(door => {
      return {
        id: door._id,
        name: door.name,
        image: door.image,
      };
    });
    return res.send(publicInfoDoors);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.delete('/', adminOnly, (req, res) => {
  res.status(200);
});

export default routes;
