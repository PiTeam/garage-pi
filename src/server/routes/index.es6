import { Router as router } from 'express';
import doorRoutes from './door';
import DB from '../lib/db';

const routes = router();

// Add new REST Endpoints here
routes.use('/api/door', doorRoutes);

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  const usersDB = new DB('users');
  usersDB.dump();
  res.render('index');
});

export default routes;
