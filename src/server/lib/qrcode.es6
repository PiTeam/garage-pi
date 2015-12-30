import qrcode from 'qrcode';

export default class QRCode {
  constructor(user) {
    this.user = user;
  }

  generate(hash) {
    return new Promise(resolve => {
      qrcode.toDataURL(hash, (err, url) => {
        resolve(url);
      });
    });
  }
}
