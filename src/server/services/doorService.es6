const gpio = require('"pi-gpio');
import * as logService from '../services/logService';

export function getStatus(door) {
  return 'Unknown';
}

export function toggle(door) {
  sendPulseToPin(door.actionGpioPin);
}

export function open(door) {
  return true;
}

export function close(door) {
  return true;
}

function sendPulseToPin(gpioPin) {
  const PULSE_DURATION = 300;
  const ON = 1;
  const OFF = 0;
  
  gpio.open(gpioPin, 'output', function() {     
    gpio.write(gpioPin, ON, function() {
      logService.log('INFO', 'Setting pin ' + gpioPin + ' ON');        
      setTimeout(function() {
        gpio.write(gpioPin, OFF, function() {
          logService.log('INFO', 'Setting pin ' + gpioPin + ' OFF');
          gpio.close(gpioPin);     
      }, PULSE_DURATION); 
  });
}
