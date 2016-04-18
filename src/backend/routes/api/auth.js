import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { authNeeded, adminOnly, createJWT } from '../../lib/auth';

const routes = router();

routes.post('/', (req, res) => {
  userRepository.checkValidUserAndPassword(req.body.username, req.body.password)
    .then(result => res.send(result)).catch(err => res.status(401).send({ message: err }));
});

routes.get('/', authNeeded, (req, res) => {
  userRepository.loadUserById(req.user.userId).then(user => {
    res.send({
      status: 'success',
      username: user.name,
      token: createJWT(user),
      admin: user.admin,
    });
  });
});

routes.get('/admin', adminOnly, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
