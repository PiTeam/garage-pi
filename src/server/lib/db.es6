const connect = require('camo').connect;

import config from 'config';

export default class DB {
  _generateDBURI(dbconfig) {
    return 'nedb://' + dbconfig.data_dir;
  }

  constructor() {
    const dbconfig = config.get('nedb');
    this.uri = this._generateDBURI(dbconfig);
  }

  connect() {
    return connect(this.uri);
  }
}
