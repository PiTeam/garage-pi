import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';
import crypto from 'crypto';

const token = config.get('auth').token;

export function generateRandomPassword() {
  return crypto.randomBytes(20).toString('hex');
}

export function createJWT(user) {
  const payload = {
    sub: user._id,
    admin: user.admin,
    iat: moment().unix(),
    exp: moment().add(token.expire.value, token.expire.unit).unix(),
  };
  return jwt.sign(payload, token.secret);
}

export function ensureAuthenticated(req, res, next) {
  const userToken = req.body.token || req.query.token || req.headers['x-auth-token'];

  if (!userToken) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header',
    });
  }

  let payload;

  try {
    payload = jwt.verify(userToken, token.secret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (!payload.exp || payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  next();
}

export function ensureAdmin(req, res, next) {
  const userToken = req.body.token || req.query.token || req.headers['x-auth-token'];

  if (!userToken) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header',
    });
  }

  let payload;

  try {
    payload = jwt.verify(userToken, token.secret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (!payload.admin) {
    return res.status(401).send({ message: 'You must be admin to access this resource' });
  }

  if (!payload.exp || payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }

  next();
}
