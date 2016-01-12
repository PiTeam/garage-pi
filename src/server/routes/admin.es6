import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => {
  return res.render('admin/index');
});

routes.get('/user', (req, res) => {
  return res.render('admin/user');
});

routes.get('/door', (req, res) => {
  return res.render('admin/door');
});

export default routes;
