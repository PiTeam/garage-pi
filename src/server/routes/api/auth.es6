import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { doorAuthorizationNeeded, adminOnly } from '../../lib/auth';

const routes = router();

routes.post('/', (req, res) => {
  userRepository.checkValidUserAndPassword(req.body.username, req.body.password).then(result => {
    return res.send(result);
  }).catch(err => {
    return res.status(401).send({ message: err });
  });
});

routes.get('/', doorAuthorizationNeeded, (req, res) => {
  res.status(200).send('ok');
});

routes.get('/admin', adminOnly, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
