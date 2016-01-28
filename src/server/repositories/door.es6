import Door from '../models/door';

export function loadDoors(query) {
  return new Promise((resolve, reject) => {
    Door.loadMany(query).then(doors => {
      if (!doors) {
        reject(new Error('Doors not found.'));
        return;
      }
      resolve(doors);
    });
  });
}

export function loadDoors(query) {
  return new Promise((resolve, reject) => {
    Door.loadMany(query).then(doors => {
      if (!doors) {
        reject(new Error('Doors not found.'));
        return;
      }
      resolve(doors);
    });
  });
}

export function loadDoorById(doorId) {
  return new Promise((resolve, reject) => {
    Door.loadOne({ _id: doorId }).then(door => {
      if (!door) {
        return reject(new Error('Door not found.'));
      }
      resolve(door);
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
      resolve(savedDoor);
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
    Door.loadOneAndUpdate({ _id: door.id }, { name: door.name, users: door.users })
      .then(numUpdated => {
        resolve(numUpdated);
      }).catch(err => {
        reject(err);
      });
  });
}
