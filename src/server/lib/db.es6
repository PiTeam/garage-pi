const connect = require('camo').connect;

import path from 'path';
import config from 'config';

const DATABASE_DIR = path.join(__dirname, '..', 'data');

export default class DB {
  _generateDBURI(dbconfig) {
    return 'nedb://' + path.join(DATABASE_DIR, dbconfig.filename);
  }

  constructor(dbname) {
    const dbconfig = config.get('nedb.' + dbname);
    console.log(this._generateDBURI(dbconfig));
    this.uri = this._generateDBURI(dbconfig);
  }

  connect() {
    return connect(this.uri);
  }
}
