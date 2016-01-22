import { Router as router } from 'express';
import * as userRepository from '../../../repositories/user';
import { adminOnly } from '../../../lib/auth';

const routes = router();

routes.get('/', adminOnly, (req, res) => {
  userRepository.loadUsers().then(users => {
    const publicInfoUsers = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        admin: user.admin,
        image: user.image,
        password: user.password,
      };
    });
    return res.send(publicInfoUsers);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.post('/', adminOnly, (req, res) => {
  userRepository.addUser({
    name: req.body.username,
  }).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.delete('/', adminOnly, (req, res) => {
  userRepository.deleteUser(req.body.userId).then(() => {
    res.status(200).send('ok');
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
