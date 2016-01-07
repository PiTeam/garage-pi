import { Document } from 'camo';

export default class User extends Document {
  constructor() {
    super();

    this.schema({
      name: String,
      password: String,
      admin: {
        type: Boolean,
        default: false,
      },
    });
  }

  validPassword(password) {
    return this.password === password;
  }
}
