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
  if (door.statusGpioPin === null) {
    return DOOR_STATUS.Unknown;
  }
  rpio.setInput(door.statusGpioPin);
  return rpio.read(door.statusGpioPin) === rpio.HIGH ? DOOR_STATUS.Closed : DOOR_STATUS.Open;
}

export function toggle(door) {
  sendPulseToPin(door.actionGpioPin);
}

export function open(door) {
  if (getStatus(door) === DOOR_STATUS.Closed) {
    sendPulseToPin(door.actionGpioPin);
  }
}

export function close(door) {
  if (getStatus(door) === DOOR_STATUS.Open) {
    sendPulseToPin(door.actionGpioPin);
  }
}
