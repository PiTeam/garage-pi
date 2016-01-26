import { Router as router } from 'express';
import * as userRepository from '../repositories/user';

const routes = router();

routes.get('/', (req, res) =>
  userRepository.loadUserByName('Admin User')
    .then(user => res.render('index', { user }))
    .catch(err => res.status(500).send(err.message))
);

export default routes;
