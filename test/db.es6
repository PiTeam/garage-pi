import { expect } from 'chai';
import DB from '../src/server/lib/db';
import NeDbStore from 'nedb';

describe('NEDB database', () => {
  it('should open database', () => {
    const dbconfig = {
      nedb_dir: '/tmp/test-data',
    };

    const db = new DB(dbconfig);
    db.connect().then(dbConn => {
      expect(dbConn).to.be.an.instance.of(NeDbStore);
    });
  });
});
