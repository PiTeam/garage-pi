import { Router as router } from 'express';
import * as userRepository from '../../repositories/user';
import { createJWT } from '../../lib/auth';
import QRCode from '../../lib/qrcode';
import { ensureAuthenticated } from '../../lib/auth';

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

routes.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).send('ok');
});

export default routes;
