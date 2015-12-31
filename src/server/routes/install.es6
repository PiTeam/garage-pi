import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import * as doorRepository from '../repositories/door';

const routes = router();

// Path to generate data
routes.post('/seed', (req, res) => {
  Promise.all([doorRepository.addDoor({
    name: 'Garage Door',
    actionGpioPin: 1,
    statusGpioPin: 2,
  }), userRepository.addUser({
    name: 'Monsonis',
    token: 456,
  })]).then(() => {
    res.send('Data seeded');
  }).catch(error => {
    res.status(500).send(error.message);
  });
});

export default routes;
