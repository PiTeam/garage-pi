import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import { createJWT } from '../lib/auth-middleware';

const routes = router();

routes.post('/', (req, res) => {
  userRepository.loadUserByName(req.body.username).then(user => {
    if (user && user.validPassword(req.body.password)) {
      return res.send({ token: createJWT(user) });
    }
    return res.status(401).send({ message: 'Invalid email and/or password' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
