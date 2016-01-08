import { Document } from 'camo';

export default class User extends Document {
  constructor() {
    super();

    this.schema({
      name: {
        type: String,
        unique: true,
      },
      password: String,
      admin: {
        type: Boolean,
        default: false,
      },
      qrcode: {
        type: Number,
        default: null,
      },
    });
  }

  validPassword(password) {
    return this.password === password;
  }
}
