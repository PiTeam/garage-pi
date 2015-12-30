import DB from '../lib/db';
import Door from '../models/door';

export function loadDoorById(doorId) {
  const db = new DB();
  db.connect().then(() => {
    return Door.loadOne({ id: doorId });
  });
}
