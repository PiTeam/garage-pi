import { Router as router } from 'express';
import apiRoutes from './api';
import doorRoutes from './door';
import adminRoutes from './admin';
import authRoutes from './auth';
import testRoutes from './test';

const routes = router();

// Add new REST Endpoints here
routes.use('/api', apiRoutes);
routes.use('/admin', adminRoutes);
routes.use('/door', doorRoutes);
routes.use('/auth', authRoutes);
routes.use('/', testRoutes);

export default routes;
