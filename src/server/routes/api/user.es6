import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { adminOnly } from '../../lib/auth';

const routes = router();

routes.get('/', adminOnly, (req, res) => {
  userRepository.loadUsers().then(users => {
    const publicInfoUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        admin: user.admin,
        password: user.password,
      };
    });
    return res.send(publicInfoUsers);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
