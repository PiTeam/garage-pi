import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import * as doorRepository from '../repositories/door';

const routes = router();

// Path to generate data
routes.get('/seed', (req, res) => {
  doorRepository.addDoor({
    name: 'Garage Door',
    actionGpioPin: 1,
    statusGpioPin: 2,
  });
  userRepository.addUser({
    name: 'Monsonis',
    token: 456,
  });

  res.send('Data seeded');
});

export default routes;
