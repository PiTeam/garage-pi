import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import QRCode from '../lib/qrcode';

const routes = router();

routes.get('/', (req, res) => {
  userRepository.loadUserByName('Admin User').then(user => {
    if (!user) {
      return res.render('index');
    }
    const qr = new QRCode(user);
    userRepository.activateUserQRCode(user._id, qr.timestamp).then(qruser => {
      qr.generateImageData().then(svgdata => {
        return res.render('index', { svgdata, user: qruser, qrcode: qr.qrcodeText });
      }).catch(err => {
        res.status(500).send(err.message);
      });
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
