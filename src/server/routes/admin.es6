import { Router as router } from 'express';
import * as userRepository from '../repositories/user';
import QRCode from '../lib/qrcode';

const routes = router();

routes.get('/', (req, res) => {
  return res.render('admin/index');
});

routes.get('/user', (req, res) => {
  return res.render('admin/user');
});

routes.get('/user/:user/qrcode', (req, res) => {
  userRepository.loadUserByName(req.params.user).then(user => {
    if (!user) {
      return res.redirect('/');
    }
    const qr = new QRCode(user);
    userRepository.activateUserQRCode(user._id, qr.timestamp).then(qruser => {
      qr.generateImageData().then(svgdata => {
        return res.render('admin/qrcode', { svgdata, user: qruser, qrcode: qr.qrcodeText });
      }).catch(err => {
        res.status(500).send(err.message);
      });
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/door', (req, res) => {
  return res.render('admin/door');
});

export default routes;
