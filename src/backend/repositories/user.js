import User from '../models/user';
import { createJWT } from '../lib/auth';
import QRCode from '../lib/qrcode';

export function loadUserByName(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ name: username }).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

export function loadUserById(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: userId }).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

export function loadUsers(query) {
  return new Promise((resolve, reject) => {
    User.find(query).then(users => {
      if (!users) {
        reject(new Error('Users not found.'));
        return;
      }
      resolve(users);
    });
  });
}

export function loadUsersWithDoor(doorId) {
  const query = { doors: { $in: [doorId] } };
  return loadUsers(query);
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    User.create(user).save().then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      return resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function getQRCode(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: userId }).then(user => {
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
}

export function activateUserQRCode(userId, timestamp) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: userId }, { qrcode: timestamp }).then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      return resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: id }).then(numDeleted => {
      resolve(numDeleted);
    }).catch(err => {
      reject(err);
    });
  });
}

export function activateUser(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: userId }).then(user => {
      const activateToken = user.generateActivateToken();
      User.findOneAndUpdate({ _id: userId }, { activateToken })
          .then(u => resolve(u))
          .catch(err => reject(err));
    }).catch(err => {
      reject(err);
    });
  });
}

export function updateUser(user) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: user._id }, { name: user.name, doors: user.doors })
      .then(() => resolve(user))
      .catch(err => reject(err));
  });
}

export function resetQRCode(userId) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: userId }, { qrcode: null }).then(savedUser => {
      if (!savedUser) {
        return reject(new Error('Cannot save User.'));
      }
      return resolve(savedUser);
    }).catch(err => {
      reject(err);
    });
  });
}

export function checkValidUserAndPassword(username, password) {
  return new Promise((resolve, reject) => {
    loadUserByName(username).then(user => {
      if (user && user.validPassword(password)) {
        return resolve({
          status: 'success',
          token: createJWT(user),
          username: user.name,
          admin: user.admin,
        });
      }
      return resolve({ status: 'error', message: 'Invalid username or password' });
    }).catch(err => {
      reject(err);
    });
  });
}

export function authUserByActivateToken(activateToken) {
  return new Promise((resolve, reject) => {
    User.findOne({ activateToken }).then(user => {
      if (user) {
        resolve({
          status: 'success',
          token: createJWT(user),
          username: user.name,
          admin: user.admin,
        });
        return;
      }
      resolve({ error: true, message: 'Invalid username or password' });
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

export function removeDoorFromUser(userId, doorId) {
  return loadUserById(userId).then(user => {
    const newUser = Object.assign({}, user);
    newUser.doors = newUser.doors.filter(id => id !== doorId);
    return updateUser(newUser);
  });
}

export function addDoorToUser(userId, doorId) {
  return loadUserById(userId).then(user => {
    const newUser = Object.assign({}, user);
    newUser.doors.push(doorId);
    return updateUser(newUser);
  });
}
