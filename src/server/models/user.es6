import { Document } from 'camo';

export default class User extends Document {
  constructor() {
    super();

    this.schema({
      name: String,
      password: String,
    });
  }

  validPassword(password) {
    return this.password === password;
  }
}
