import DOOR_STATUS from '../models/enums/doorStatus';
import GPIO from '../lib/gpio';

export function getStatus(door) {
  if (door.statusGpioPin === null || door.statusGpioPin === undefined) {
    return DOOR_STATUS.Unknown;
  }
  const pinToRead = new GPIO(door.statusGpioPin, 'in');
  return pinToRead.readSync() === 1 ? DOOR_STATUS.Closed : DOOR_STATUS.Open;
}

export function toggle(door) {
  const gpio = new GPIO(door.actionGpioPin, 'out');
  gpio.sendPulseToPin();
}

export function open(door) {
  const doorStatus = getStatus(door);
  if (doorStatus === DOOR_STATUS.Unknown) {
    throw new Error('You can not open a door without sensor status');
  }
  if (doorStatus === DOOR_STATUS.Open) {
    throw new Error('Cannot open an already open door.');
  }
  const gpio = new GPIO(door.actionGpioPin, 'out');
  gpio.sendPulseToPin();
}

export function close(door) {
  const doorStatus = getStatus(door);
  if (doorStatus === DOOR_STATUS.Unknown) {
    throw new Error('You can not close a door without sensor status');
  }
  if (doorStatus === DOOR_STATUS.Closed) {
    throw new Error('Cannot close an already closed door.');
  }
  const gpio = new GPIO(door.actionGpioPin, 'out');
  gpio.sendPulseToPin();
}
