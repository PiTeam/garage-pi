import Datastore from 'nedb';
import path from 'path';
import config from 'config';

const DATABASE_DIR = path.join(__dirname, '..', 'data');

export default class DB {
    constructor(dbname) {
      const dbconfig = config.get('nedb.' + dbname);
      const filename = path.join(DATABASE_DIR, dbconfig.filename);
      this.db = new Datastore(Object.assign({}, dbconfig, { filename }));
    }

    dump() {
    }
}
