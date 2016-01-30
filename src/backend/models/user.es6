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
      image: {
        type: String,
        default: '/assets/img/profile.jpg',
      },
      qrcode: {
        type: Number,
        default: null,
      },
      doors: [String],
    });
  }

  validPassword(password) {
    return this.password === password;
  }
}
