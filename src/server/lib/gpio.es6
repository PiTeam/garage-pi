// import { Gpio } from 'onoff';
import * as logService from '../services/log';

export default class GPIO {
  constructor(pin, direction) {
    // this.gpio = new Gpio(pin, direction);
    this.pin = pin;
    this.direction = direction;
  }

  setDirection(direction) {
    this.gpio.setDirection(direction);
  }

  readSync() {
    // return this.gpio.readSync();
    return 0;
  }

  sendPulseToPin() {
    const PULSE_DURATION = 300;
    // this.gpio.writeSync(1);
    logService.log('INFO', 'Setting pin ' + this.pin + ' ON');
    setTimeout(() => {
      // this.gpio.writeSync(0);
      logService.log('INFO', 'Setting pin ' + this.pin + ' OFF');
    }, PULSE_DURATION);
  }
}
