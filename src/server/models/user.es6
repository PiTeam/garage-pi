import { Document } from 'camo';

export class User extends Document {
  constructor() {
    super();

    this.schema({
      token: String,
      name: String,
    });
  }
}
