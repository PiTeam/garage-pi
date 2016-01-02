import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => {
  res.send('auth page');
});

export default routes;
