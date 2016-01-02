import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => {
  return res.render('auth');
});

export default routes;
