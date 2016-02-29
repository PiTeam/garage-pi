import { Document } from 'camo';
import Door from './door';
import User from './user';

export default class Log extends Document {
  constructor() {
    super();

    this.schema({
      date: {
        type: Date,
        default: Date.now,
      },
      door: Door,
      user: User,
      message: String,
    });
  }
}
