import qr from 'qr-image';
import jwt from 'jsonwebtoken';
import config from 'config';
import moment from 'moment';

const token = config.get('auth').token;

export default class QRCode {
  constructor(user) {
    this.iat = moment().valueOf();
    const payload = {
      name: user.name,
      password: user.password,
      iat: this.iat,
    };
    this.qrcode = jwt.sign(payload, token.secret);
  }

  get timestamp() {
    return this.iat;
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

  get qrcodeText() {
    return this.qrcode;
  }

  _streamToString(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      cb(chunks.join(''));
    });
  }

  generateImageData() {
    return new Promise((resolve, reject) => {
      const stream = qr.image(this.qrcode, { type: 'svg' });

      this._streamToString(stream, data => {
        if (!data) {
          return reject(false);
        }
        resolve(data);
      });
    });
  }
}
