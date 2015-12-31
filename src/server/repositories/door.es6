import DB from '../lib/db';
import Door from '../models/door';
import config from 'config';

const dbConfig = config.get('nedb');

export function loadDoorById(doorId) {
  return new Promise((resolve, reject) => {
    const db = new DB(dbConfig);
    db.connect().then(() => {
      Door.loadOne({ _id: doorId }).then(door => {
        if (!door) {
          reject(new Error('Door not found.'));
          return;
        }
        resolve(door);
      });
    });
  });
}

export function addDoor(door) {
  return new Promise((resolve, reject) => {
    const db = new DB(dbConfig);
    db.connect().then(() => {
      Door.create(door).save().then(savedDoor => {
        if (!savedDoor) {
          reject(new Error('Cannot save Door.'));
          return;
        }
        resolve(savedDoor);
      });
    });
  });
}
