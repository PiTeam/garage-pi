import { Router as router } from 'express';
import doorRoutes from './door';
import userRoutes from './user';

const routes = router();

// Add new REST Endpoints here
routes.use('/door', doorRoutes);
routes.use('/user', userRoutes);

export default routes;
