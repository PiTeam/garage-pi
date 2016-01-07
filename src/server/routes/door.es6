import { Router as router } from 'express';
import * as doorRepository from '../repositories/door';
import * as doorService from '../services/door';

const routes = router();

routes.get('/', (req, res) => {
  doorRepository.loadDoors().then(doors => {
    const userDoors = doors.map(door => {
      return {
        id: door.id,
        name: door.name,
        actionGpioPin: door.actionGpioPin,
        statusGpioPin: door.statusGpioPin,
        status: doorService.getStatus(door),
      };
    });
    return res.render('door', { doors: userDoors });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
