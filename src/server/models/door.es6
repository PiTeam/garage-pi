import { Document } from 'camo';

export class Door extends Document {
  constructor() {
    super();

    this.schema({
      id: String,
      name: String,
      actionGpioPin: Number,
      statusGpioPin: Number,
    });
  }
}
