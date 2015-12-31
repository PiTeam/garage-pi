// import rpio from 'rpio';
import rpio from '../lib/rpio-mock';
import * as logService from '../services/log';
import DOOR_STATUS from '../models/enums/doorStatus';

function sendPulseToPin(gpioPin) {
  const PULSE_DURATION = 300;

  rpio.setOutput(gpioPin);
  rpio.write(gpioPin, rpio.HIGH);
  logService.log('INFO', 'Setting pin ' + gpioPin + ' ON');
  rpio.msleep(PULSE_DURATION);
  rpio.write(gpioPin, rpio.LOW);
  logService.log('INFO', 'Setting pin ' + gpioPin + ' OFF');
}

export function getStatus(door) {
  if (door.statusGpioPin === null || door.statusGpioPin === undefined) {
    return DOOR_STATUS.Unknown;
  }
  rpio.setInput(door.statusGpioPin);
  return rpio.read(door.statusGpioPin) === rpio.HIGH ? DOOR_STATUS.Closed : DOOR_STATUS.Open;
}

export function toggle(door) {
  sendPulseToPin(door.actionGpioPin);
}

export function open(door) {
  const doorStatus = getStatus(door);
  if (doorStatus === DOOR_STATUS.Unknown) {
    throw new Error('You can not open a door without sensor status');
  }
  if (doorStatus === DOOR_STATUS.Open) {
    throw new Error('Cannot open an already open door.');
  }
  sendPulseToPin(door.actionGpioPin);
}

export function close(door) {
  const doorStatus = getStatus(door);
  if (doorStatus === DOOR_STATUS.Unknown) {
    throw new Error('You can not close a door without sensor status');
  }
  if (doorStatus === DOOR_STATUS.Closed) {
    throw new Error('Cannot close an already closed door.');
  }
  sendPulseToPin(door.actionGpioPin);
}
