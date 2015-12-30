import Door from '../models/door';

export function loadDoorById(doorId) {
  return Door.loadOne({ id: doorId });
}
