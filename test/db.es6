import { expect } from 'chai';
import DB from '../src/server/lib/db';
import NeDbStore from 'nedb';
import config from 'config';

describe('NEDB database', () => {
  it('should open database', () => {
    const dbconfig = config.get('nedb');

    const db = new DB(dbconfig);
    db.connect().then(dbConn => {
      expect(dbConn).to.be.an.instance.of(NeDbStore);
    });
  });
});
