import { Router as router } from 'express';

const routes = router();

routes.get('/', (req, res) => res.render('admin/index'));
routes.get('/user', (req, res) => res.render('admin/user'));
routes.get('/door', (req, res) => res.render('admin/door'));

export default routes;
