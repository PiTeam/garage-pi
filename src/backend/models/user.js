import { Document } from 'camo';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import config from 'config';

const token = config.get('auth').token;
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
        default: '/static/img/profile.jpg',
      },
      activateToken: {
        type: String,
        default: null,
      },
      doors: [String],
    });
  }

  validPassword(password) {
    return this.password === password;
  }

  generateActivateToken() {
    const iat = moment().valueOf();
    const payload = {
      name: this.name,
      iat,
    };
    return jwt.sign(payload, token.secret);
  }
}
