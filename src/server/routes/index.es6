import { Router as router } from 'express';
import doorRoutes from './door';
import authRoutes from './auth';
import testRoutes from './test';
import QRCode from '../lib/qrcode';

const routes = router();

// Add new REST Endpoints here
routes.use('/api/door', doorRoutes);
routes.use('/api/auth', authRoutes);
routes.use('/api/test', testRoutes);

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  const qr = new QRCode('dave');
  qr.generate('hello world').then(imgdata => {
    return res.render('index', { qrcode: imgdata });
  });
});

export default routes;
