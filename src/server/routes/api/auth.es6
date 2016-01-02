import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { createJWT } from '../../lib/auth';
import QRCode from '../../lib/qrcode';

const routes = router();

routes.post('/', (req, res) => {
  const userData = QRCode.decode(req.body.qrcode);

  userRepository.loadUserByName(userData.name).then(user => {
    if (user && user.validPassword(userData.password)) {
      return res.send({ token: createJWT(user) });
    }
    return res.status(401).send({ message: 'Invalid email and/or password' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
