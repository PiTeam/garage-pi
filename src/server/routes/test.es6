import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import QRCode from '../lib/qrcode';

const routes = router();

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  userRepository.loadUserByName('Test').then(user => {
    if (!user) {
      return res.render('index');
    }
    const qr = new QRCode(user);
    qr.generate().then(imgdata => {
      return res.render('index', { imgdata, user });
    }).catch(err => {
      res.status(500).send(err.message);
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
