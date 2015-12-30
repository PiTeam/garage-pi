import { expect } from 'chai';
import DB from '../src/server/lib/db';
import config from 'config';

describe('NEDB database', () => {
  it('should open database', done => {
    const dbconfig = config.get('nedb');

    const db = new DB(dbconfig);
    db.connect().then(dbConn => {
      expect(dbConn.constructor.name).to.equal('NeDbClient');
      done();
    }).catch(err => {
      console.log(err.message);
    });
  });
});
