const connect = require('camo').connect;

export default class DB {
  _generateDBURI(config) {
    return `nedb://${config.nedb_dir}`;
  }

  constructor(config) {
    this.uri = this._generateDBURI(config);
  }

  connect() {
    return connect(this.uri);
  }
}
