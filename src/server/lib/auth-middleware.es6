import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';

const tokenSecret = config.get('express').tokensecret;

export function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  const token = req.headers.authorization.split(' ')[1];

  let payload = null;

  try {
    payload = jwt.decode(token, tokenSecret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
