import User from '../models/user';
import { createJWT } from '../lib/auth';
import QRCode from '../lib/qrcode';

export function loadUserByName(username) {
  return new Promise((resolve, reject) => {
    User.loadOne({ name: username }).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

export function loadUsers(query) {
  return new Promise((resolve, reject) => {
    User.loadMany(query).then(users => {
      if (!users) {
        reject(new Error('Users not found.'));
        return;
      }
      resolve(users);
    });
  });
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    User.create(user).save().then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function activateUserQRCode(userId, timestamp) {
  return new Promise((resolve, reject) => {
    User.loadOneAndUpdate({ _id: userId }, { qrcode: timestamp }).then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function resetQRCode(userId) {
  return new Promise((resolve, reject) => {
    User.loadOneAndUpdate({ _id: userId }, { qrcode: null }).then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function checkValidUserAndPassword(username, password) {
  return new Promise((resolve, reject) => {
    loadUserByName(username).then(user => {
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
    loadUserByName(qrdata.name).then(user => {
      if (user && user.qrcode === qrdata.iat && user.validPassword(qrdata.password)) {
        resetQRCode(user._id).then(() => {
          resolve({ token: createJWT(user) });
        });
      }
    }).catch(err => {
      reject(err);
    });
  });
}
