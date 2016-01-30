import { Router as router } from 'express';
import doorRoutes from './door';
import authRoutes from './auth';
import adminRoutes from './admin';

const routes = router();

// Add new REST Endpoints here
routes.use('/door', doorRoutes);
routes.use('/auth', authRoutes);
routes.use('/admin', adminRoutes);

export default routes;
