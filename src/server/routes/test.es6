import { Router as router } from 'express';
import * as User from '../models/user';
import * as Door from '../models/door';
import { generateRandomPassword } from '../lib/auth';

const routes = router();

routes.post('/populate', (req, res) => {
  User.create({
    name: "Pepe Lopez",
    token: generateRandomPassword(),
  });
  
  Door.create({
    
  });
  
  return res.status(200).
});

export default routes;
