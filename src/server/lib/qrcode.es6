import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import config from 'config';

const token = config.get('auth').token;

export default class QRCode {
  constructor(user) {
    this.user = user;
  }
  _sign() {
    const payload = {
      name: this.user.name,
      password: this.user.password,
    };
    return jwt.sign(payload, token.secret);
  }

  static decode(qrcodeString) {
    let payload;

    try {
      payload = jwt.verify(qrcodeString, token.secret);
    } catch (err) {
      payload = undefined;
    }

    return payload;
  }

  generate() {
    return new Promise((resolve, reject) => {
      qrcode.toDataURL(this._sign(), (err, url) => {
        if (err) {
          return reject(err);
        }
        resolve(url);
      });
    });
  }
}
