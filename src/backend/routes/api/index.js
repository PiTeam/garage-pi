import { Router as router } from 'express';
import doorRoutes from './door';
import authRoutes from './auth';
import userRoutes from './user';
import adminRoutes from './admin';

const routes = router();

// Add new REST Endpoints here
routes.use('/door', doorRoutes);
routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/admin', adminRoutes);

export default routes;
