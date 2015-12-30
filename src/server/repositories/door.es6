import Door from '../models/door';

export function loadDoorById(doorId, callback) {
  Door.loadOne({ id: doorId }).then(callback);
}
