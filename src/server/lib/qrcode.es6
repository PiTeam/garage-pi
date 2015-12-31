import qrcode from 'qrcode';

export default class QRCode {
  constructor(user) {
    this.user = user;
  }

  generate(password) {
    return new Promise((resolve, reject) => {
      qrcode.toDataURL(password, (err, url) => {
        if (err) {
          return reject(err);
        }
        resolve(url);
      });
    });
  }
}
