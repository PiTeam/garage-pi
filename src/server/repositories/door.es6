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

export function loadDoorById(doorId) {
  return new Promise((resolve, reject) => {
    Door.loadOne({ _id: doorId }).then(door => {
      if (!door) {
        reject(new Error('Door not found.'));
        return;
      }
      resolve(door);
    });
  });
}

export function addDoor(door) {
  return new Promise((resolve, reject) => {
    Door.create(door).save().then(savedDoor => {
      if (!savedDoor) {
        reject(new Error('Cannot save Door.'));
        return;
      }
      resolve(savedDoor);
    });
  });
}
