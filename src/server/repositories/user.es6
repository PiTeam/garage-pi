import User from '../models/user';

export function loadUserByName(username) {
  return new Promise((resolve, reject) => {
    User.loadOne({ name: username }).then(user => {
      if (!user) {
        reject(new Error('User not found.'));
        return;
      }
      resolve(user);
    });
  });
}

export function addUser(user) {
  return new Promise((resolve, reject) => {
    User.create(user).save().then(savedUser => {
      if (!savedUser) {
        reject(new Error('Cannot save User.'));
        return;
      }
      resolve(savedUser);
    });
  });
}
