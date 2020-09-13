const { MongoClient } = require('mongodb');
const EventEmitter = require('events');

class Database extends EventEmitter {
  constructor(url) {
    super();

    this._client = new MongoClient(url, { useUnifiedTopology: true });
    this._db = null;
  }

  async connect(name) {
    await this._client.connect();

    this._db = this._client.db(name);

    this.emit('connect');

    return this._db;
  }

  async close() {
    await this._client.close();

    this.emit('diconect');
  }

  collection(name) {
    return this._db.collection(name);
  }
}

module.exports = Database;
