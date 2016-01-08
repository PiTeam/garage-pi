import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';
import crypto from 'crypto';
import * as userRepository from '../repositories/user';
import QRCode from './qrcode';

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

export function checkValidUserAndPassword(username, password) {
  return new Promise((resolve, reject) => {
    userRepository.loadUserByName(username).then(user => {
      if (user && user.validPassword(password)) {
        resolve({ token: createJWT(user) });
      }
    }).catch(err => {
      reject(err);
    });
  });
}

export function checkValidQRCode(qrcode) {
  const qrdata = QRCode.decode(qrcode);
  return new Promise((resolve, reject) => {
    userRepository.loadUserByName(qrdata.name).then(user => {
      if (user && user.qrcode === qrdata.iat && user.validPassword(qrdata.password)) {
        userRepository.resetQRCode(user._id).then(() => {
          resolve({ token: createJWT(user) });
        });
      }
    }).catch(err => {
      reject(err);
    });
  });
}
