import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import config from 'config';

const token = config.get('auth').token;

export default class QRCode {
  constructor(user) {
    const payload = {
      name: user.name,
      password: user.password,
    };
    this.qrcode = jwt.sign(payload, token.secret);
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

  getQRCodeText() {
    return this.qrcode;
  }

  generateImageData() {
    return new Promise((resolve, reject) => {
      qrcode.toDataURL(this.qrcode, (err, url) => {
        if (err) {
          return reject(err);
        }
        resolve(url);
      });
    });
  }
}
