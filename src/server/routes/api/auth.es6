import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { createJWT } from '../../lib/auth';
import QRCode from '../../lib/qrcode';

const routes = router();

routes.post('/', (req, res) => {
  let data;

  if (req.body.username && req.body.password) {
    data = {
      username: req.body.username,
      password: req.body.password,
    };
  } else if (req.body.qrcode) {
    const userData = QRCode.decode(req.body.qrcode);
    console.log(userData);

    if (!userData) {
      return res.status(401).send({ message: 'Invalid authentication data' });
    }

    data = {
      username: userData.name,
      password: userData.password,
    };
  } else {
    return res.status(401).send({ message: 'Invalid authentication data' });
  }


  userRepository.loadUserByName(data.username).then(user => {
    if (user && user.validPassword(data.password)) {
      return res.send({ token: createJWT(user) });
    }
    return res.status(401).send({ message: 'Invalid authentication data' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
