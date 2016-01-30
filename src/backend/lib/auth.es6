import config from 'config';
import moment from 'moment';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user';
import expressjwt from 'express-jwt';

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

function ensureAdmin(req, res, next) {
  if (!req.user || !req.user.admin) {
    return res.status(401).send({ message: 'You must be admin to access this resource' });
  }

  next();
}

function ensureDoorAuthorized(req, res, next) {
  userRepository.loadUserById(req.user.userId).then(user => {
    const doorId = req.params.doorId;
    if (!req.user.admin && user.doors.indexOf(doorId) === -1) {
      return res.status(401).send({ message: 'You are not authorized to open this door' });
    }
    next();
  });
}

export const adminOnly = [expressjwt({ secret: token.secret }), ensureAdmin];
export const doorAuthorizationNeeded = [expressjwt({ secret: token.secret }), ensureDoorAuthorized];
