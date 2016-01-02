import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import * as doorRepository from '../../repositories/door';
import { generateRandomPassword } from '../../lib/auth';
const routes = router();

// Path to generate data
routes.post('/seed', (req, res) => {
  Promise.all([doorRepository.addDoor({
    name: 'Garage Door',
    actionGpioPin: 1,
    statusGpioPin: 2,
  }), userRepository.addUser({
    name: 'Test',
    password: generateRandomPassword(),
  })]).then(() => {
    res.status(200).send({ message: 'Data seeded' });
  }).catch(error => {
    res.status(500).send(error.message);
  });
});

export default routes;
