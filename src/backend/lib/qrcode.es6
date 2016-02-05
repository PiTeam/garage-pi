import qr from 'qr-image';
import config from 'config';
import moment from 'moment';
import jwt from 'jsonwebtoken';

const token = config.get('auth').token;

export default class QRCode {
  constructor(user) {
    this.iat = moment().valueOf();
    const payload = {
      name: user.name,
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

  get qrcodeURL() {
    const url = `${config.get('api').base}${config.get('api').get.adminActivateUser}`;
    return `${url}${this.qrcode}`;
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
