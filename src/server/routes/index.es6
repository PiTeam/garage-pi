import { Router as router } from 'express';
import doorRoutes from './door';
import DB from '../lib/db';
import { User } from '../models/user';

const routes = router();

// Add new REST Endpoints here
routes.use('/api/door', doorRoutes);

// Default response, REMOVE when ready
routes.get('/', (req, res) => {
  const db = new DB('users');
  db.connect().then(() => {
    const dave = User.create({
      name: 'David',
      token: '123',
    });

    dave.save().then(user => {
      res.render('index', user);
    });
  }).catch(err => {
    res.status(500).send(err.message);
  });
});

export default routes;
