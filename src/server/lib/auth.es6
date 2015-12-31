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
    iat: moment().unix(),
    exp: moment().add(token.expire.value, token.expire.unit).unix(),
  };
  return jwt.sign(payload, token.secret);
}

export function ensureAuthenticated(req, res, next) {
  const userToken = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!userToken) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }

  let payload;

  try {
    payload = jwt.verify(userToken, token.seecret);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (!payload.exp || payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}
