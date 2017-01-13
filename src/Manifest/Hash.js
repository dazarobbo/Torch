/**
 *
 */
export default class Hash {

  constructor(val) {
    this._hash = parseInt(val, 10);
  }

  /**
   * @param {ContentDatabase} db - database to query if given
   * @return {Promise.<Object>} -
   */
  getContent(db = null) {

    if(Hash.DATABASE) {
      return Hash.DATABASE.getAnyContent(this._hash);
    }

    if(db) {
      return db.getAnyContent(this._hash);
    }

    return Promise.reject("no content database available");

  }

  toString() {
    return this._hash.toString();
  }

  static setDefaultDatabase(db) {
    Hash.DATABASE = db;
  }

}

Hash.DATABASE = null;
