import qr from 'qr-image';
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
