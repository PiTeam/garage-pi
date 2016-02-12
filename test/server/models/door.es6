import { expect } from 'chai';
import DB from '../../../src/backend/lib/db';
import Door from '../../../src/backend/models/door';
import config from 'config';

describe('Door model', () => {
  let dbConn;
  before(done => {
    const dbconfig = config.get('nedb');
    const db = new DB(dbconfig);
    db.connect().then(conn => {
      dbConn = conn;
      dbConn.dropDatabase().then(() => {
        done();
      });
    }).catch(err => {
      console.log(err.message);
    });
  });

  beforeEach(done => {
    done();
  });

  afterEach(done => {
    return dbConn.dropDatabase().then(() => {
      done();
    }).catch(err => {
      console.log(err.message);
    });
  });

  it('should create a new door', done => {
    const door = Door.create({
      name: 'test',
      actionGpioPin: 11,
      statusGpioPin: 1
    });

    door.save().then(dbDoor => {
      expect(dbDoor.constructor.name).to.equal('Door');
      expect(dbDoor.name).to.equal('test');
      expect(dbDoor.actionGpioPin).to.equal(11);
      expect(dbDoor.statusGpioPin).to.equal(1);
      done();
    }).catch(err => {
      console.log(err.message);
    });
  });
});
