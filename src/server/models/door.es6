export class Door {
  constructor(id, name, actionGpioPin, statusGpioPin) {
    this.id = id;
    this.name = name;
    this.actionGpioPin = actionGpioPin;
    this.statusGpioPin = statusGpioPin;
  }
}
