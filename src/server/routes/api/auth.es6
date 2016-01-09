import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { doorAuthorizationNeeded } from '../../lib/auth';

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
    console.log(token);
    return res.send(token);
  }).catch(err => {
    return res.status(401).send({ message: err });
  });
});

routes.get('/', doorAuthorizationNeeded, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
