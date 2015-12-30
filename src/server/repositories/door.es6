import DB from '../lib/db';
import Door from '../models/door';
import config from 'config';

const dbConfig = config.get('nedb');

export function loadDoorById(doorId) {
  const db = new DB(dbConfig);
  db.connect().then(() => {
    return Door.loadOne({ id: doorId });
  });
}
