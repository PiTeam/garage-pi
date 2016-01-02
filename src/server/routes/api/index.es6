import { Router as router } from 'express';
import doorRoutes from './door';
import authRoutes from './auth';
import setupRoutes from './setup';

const routes = router();

// Add new REST Endpoints here
routes.use('/door', doorRoutes);
routes.use('/auth', authRoutes);
routes.use('/setup', setupRoutes);

export default routes;
