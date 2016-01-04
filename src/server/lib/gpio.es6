import 'gpio';

export default class GPIO {
  constructor() {
    this.gpio = {};
  }
  
  setOutput(pin) {
    this.gpio = gpio.export(pin, {
      direction: 'out',
      
    })
  }
}