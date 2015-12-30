import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';

const tokenSecret = config.get('express').tokensecret;

export function createJWT(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };
  return jwt.sign(payload, tokenSecret);
}

export function ensureAuthenticated(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }

  let payload;

  try {
    payload = jwt.verify(token, tokenSecret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (!payload.exp || payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
