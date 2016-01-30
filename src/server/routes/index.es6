import { Router as router } from 'express';
import apiRoutes from './api';

const routes = router();

// Add new REST Endpoints here
routes.use('/api', apiRoutes);

export default routes;
