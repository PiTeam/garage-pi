import Door from '../models/door';
import * as userRepository from './user';

export function loadDoors(query) {
  return new Promise((resolve, reject) => {
    Door.find(query).then(doors => {
      resolve(doors);
    }).catch(err => {
      reject(err);
    });
  });
}

export function loadDoorsByUser(userId) {
  return new Promise((resolve, reject) => {
    userRepository.loadUserById(userId).then(user => {
      Door.find({ _id: { $in: user.doors } }).then(doors => {
        resolve(doors);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

function loadDoorWithUsers(door) {
  return new Promise((resolve) => {
    userRepository.loadUsersWithDoor(door._id).then(users => {
      const doorWithUsers = Object.assign({}, door);
      doorWithUsers.users = users.map(user => user._id);
      resolve(doorWithUsers);
    });
  });
}

export function loadDoorsWithUsers(query) {
  return new Promise((resolve, reject) => {
    Door.find(query).then(doors => {
      const doorsWithUsers = [];
      doors.forEach(door => {
        doorsWithUsers.push(loadDoorWithUsers(door));
      });

      Promise.all(doorsWithUsers).then(result => {
        resolve(result);
      });
    }).catch(err => {
      reject(err);
    });
  });
}

export function loadDoorById(doorId) {
  return new Promise((resolve, reject) => {
    Door.findOne({ _id: doorId }).then(door => {
      if (!door) {
        return reject(new Error('Door not found.'));
      }
      return resolve(door);
    }).catch(err => {
      reject(err);
    });
  });
}

export function addDoor(door) {
  return new Promise((resolve, reject) => {
    Door.create(door).save().then(savedDoor => {
      if (!savedDoor) {
        return reject(new Error('Cannot save Door.'));
      }
      return resolve(savedDoor);
    }).catch(err => {
      reject(err);
    });
  });
}

export function deleteDoor(id) {
  return new Promise((resolve, reject) => {
    Door.deleteOne({ _id: id }).then(numDeleted => {
      resolve(numDeleted);
    }).catch(err => {
      reject(err);
    });
  });
}

export function updateDoor(door) {
  return new Promise((resolve, reject) => {
    Door.findOneAndUpdate({ _id: door._id }, { name: door.name, users: door.users })
      .then(() => {
        resolve(door);
      }).catch(err => {
        reject(err);
      });
  });
}
