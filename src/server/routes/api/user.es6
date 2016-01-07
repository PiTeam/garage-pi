import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';

const routes = router();

routes.get('/', (req, res) => {
  userRepository.loadUsers().then(users => {
    const publicInfoUsers = users.map(user => {
      return {
        id: user.id,
        name: user.name,
      };
    });
    return res.send(publicInfoUsers);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
