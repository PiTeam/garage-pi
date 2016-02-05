import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';

const routes = router();

routes.post('/activate', (req, res) => {
  userRepository.authUserByActivateToken(req.body.activateToken)
    .then(result => res.send(result)
  ).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
