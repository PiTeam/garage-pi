import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';
import crypto from 'crypto';
import * as userRepository from '../repositories/user';

const token = config.get('auth').token;

export function generateRandomPassword() {
  return crypto.randomBytes(20).toString('hex');
}

export function createJWT(user) {
  const payload = {
    userId: user._id,
    admin: user.admin,
    iat: moment().unix(),
    exp: moment().add(token.expire.value, token.expire.unit).unix(),
  };
  return jwt.sign(payload, token.secret);
}

function ensureAuthenticated(req, res, next) {
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

function ensureAdmin(req, res, next) {
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

export function getAuthQuery(req) {
  const userToken = req.body.token || req.query.token || req.headers['x-auth-token'];
  const payload = jwt.verify(userToken, token.secret);

  if (payload.admin) {
    return {};
  }

  return {
    userId: payload.userId,
    admin: payload.admin,
  };
}

function ensureDoorAuthorized(req, res, next) {
  const userToken = req.body.token || req.query.token || req.headers['x-auth-token'];
  const payload = jwt.verify(userToken, token.secret);
  userRepository.loadUserById(payload.userId).then(user => {
    const doorId = req.params.doorId;
    if (!payload.admin && user.doors.indexOf(doorId) === -1) {
      return res.status(401).send({ message: 'You are not authorized to open this door' });
    }
    next();
  });
}

export const adminOnly = [ensureAdmin];
export const doorAuthorizationNeeded = [ensureAuthenticated, ensureDoorAuthorized];
