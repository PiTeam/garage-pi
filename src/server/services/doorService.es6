// import rpio from 'rpio';
import rpio from '../lib/rpio-mock';
import * as logService from '../services/logService';

function sendPulseToPin(gpioPin) {
  const PULSE_DURATION = 300;

  rpio.setOutput(gpioPin);
  rpio.write(gpioPin, rpio.HIGH);
  logService.log('INFO', 'Setting pin ' + gpioPin + ' ON');
  rpio.msleep(PULSE_DURATION);
  rpio.write(gpioPin, rpio.LOW);
  logService.log('INFO', 'Setting pin ' + gpioPin + ' OFF');
}

export function getStatus() {
  return 'Unknown';
}

export function toggle(door) {
  sendPulseToPin(door.actionGpioPin);
}

export function open(door) {
  if (getStatus(door) === 'CLOSED') {
    sendPulseToPin(door.actionGpioPin);
  }
}

export function close(door) {
  if (getStatus(door) === 'OPEN') {
    sendPulseToPin(door.actionGpioPin);
  }
}
