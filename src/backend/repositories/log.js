import Log from '../models/log';

export function addUser(log) {
  return new Promise((resolve, reject) => {
    Log.create(log).save().then(savedLog => {
      if (!savedLog) {
        return reject(new Error('Cannot save Log.'));
      }
      return resolve(savedLog);
    }).catch(err => {
      reject(err);
    });
  });
}
