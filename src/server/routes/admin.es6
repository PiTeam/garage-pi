import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => {
  return res.render('admin/index');
});

routes.get('/users', (req, res) => {
  return res.render('admin/users');
});

routes.get('/doors', (req, res) => {
  return res.render('admin/doors');
});

export default routes;
