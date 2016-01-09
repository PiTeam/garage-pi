import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => {
  return res.render('door');
});

export default routes;
