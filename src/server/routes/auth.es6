import { Router as router } from 'express';

const routes = router();

routes.get('/login', (req, res) => res.render('login'));

export default routes;
