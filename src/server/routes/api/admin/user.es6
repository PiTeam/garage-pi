import { Router as router } from 'express';
import * as userRepository from '../../../repositories/user';
import { adminOnly } from '../../../lib/auth';
import QRCode from '../../../lib/qrcode';

const routes = router();

routes.get('/', adminOnly, (req, res) => {
  userRepository.loadUsers().then(users => {
    const publicInfoUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      admin: user.admin,
      image: user.image,
      password: user.password,
      doors: user.doors,
    }));
    return res.send(publicInfoUsers);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.get('/qrcode/:userId', adminOnly, (req, res) =>
  userRepository.loadUserById(req.params.userId).then(user => {
    const qr = new QRCode(user);
    qr.generateImageData().then(qrcode => {
      res.send({ qrcode });
    });
  }).catch(err => res.status(500).send(err.message))
);

routes.post('/', adminOnly, (req, res) => {
  userRepository.addUser(req.body.user).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.delete('/:id', adminOnly, (req, res) => {
  userRepository.deleteUser(req.params.id).then(() => {
    res.status(200).send({ status: 'ok' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

routes.put('/:id', adminOnly, (req, res) => {
  userRepository.updateUser(req.body.user).then(() => {
    res.status(200).send({ status: 'ok' });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
