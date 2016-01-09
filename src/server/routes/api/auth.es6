import { Router as router } from 'express';
import * as auth from '../../lib/auth';
import * as userRepository from '../../repositories/user';

const routes = router();

routes.post('/', (req, res) => {
  let validator;

  if (req.body.username && req.body.password) {
    validator = userRepository.checkValidUserAndPassword(req.body.username, req.body.password);
  } else if (req.body.qrcode) {
    validator = userRepository.checkValidQRCode(req.body.qrcode);
  } else {
    return res.status(401).send({ message: 'Invalid authentication data' });
  }

  validator.then(token => {
    return res.send(token);
  }).catch(err => {
    return res.status(401).send({ message: err });
  });
});

routes.get('/', auth.ensureAuthenticated, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
