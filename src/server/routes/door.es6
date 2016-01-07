import { Router as router } from 'express';
import * as doorRepository from '../repositories/door';
import * as doorService from '../services/door';

const routes = router();

routes.get('/', (req, res) => {
  doorRepository.loadDoors().then(userDoors => {
    userDoors.map(door => {
      const status = doorService.getStatus(door);
      return Object.assign({}, status, door);
    });
    return res.render('door', { doors: userDoors });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
