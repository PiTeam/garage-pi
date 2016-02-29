import { expect } from 'chai';
import DB from '../../../src/backend/lib/db';
import User from '../../../src/backend/models/user';
import config from 'config';

describe('User model', () => {
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

  it('should create a new user', done => {
    const user = User.create({
      name: 'test',
      password: 'ye',
    });

    user.save().then(dbUser => {
      expect(dbUser.constructor.name).to.equal('User');
      expect(dbUser.name).to.equal('test');
      expect(dbUser.password).to.equal('ye');
      done();
    }).catch(err => {
      console.log(err.message);
    });
  });
});
