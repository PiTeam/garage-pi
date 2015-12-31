import { Router as router } from 'express';
import doorRoutes from './door';
import authRoutes from './auth';
import installRoutes from './install';
import QRCode from '../lib/qrcode';
import * as doorRepository from '../repositories/door';
import * as doorService from '../services/door';

const routes = router();

// Add new REST Endpoints here
routes.use('/api/door', doorRoutes);
routes.use('/api/auth', authRoutes);

// Seed data - REMOVE when backend ready
routes.use('/install', installRoutes);

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  const qr = new QRCode('dave');
  qr.generate('hello world').then(imgdata => {
    return res.render('index', { qrcode: imgdata });
  });
});

routes.get('/doors', (req, res) => {
  doorRepository.loadDoors().then(userDoors => {
    userDoors.map(door => {
      door.status = doorService.getStatus(door);
    });
    return res.render('doors', { doors: userDoors });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
