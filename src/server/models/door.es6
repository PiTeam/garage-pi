import { Document } from 'camo';

export default class Door extends Document {
  constructor() {
    super();

    this.schema({
      name: String,
      actionGpioPin: Number,
      statusGpioPin: Number,
    });
  }
}
