import { Router as router } from 'express';
import doorRoutes from './door';

const routes = router();

// Add new REST Endpoints here
routes.use('/api/door', doorRoutes);

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  res.render('index');
});

export default routes;
