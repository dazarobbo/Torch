import sqlite3 from "sqlite3";
import path from "path";

/**
 *
 */
export default class ContentDatabase {

  constructor(sqlFile) {
    this._filepath = sqlFile;
    this.db = new sqlite3.Database(sqlFile);
    this._initalised = false;
    this._tables = [];
  }

  _init() {
    return new Promise((resolve, reject) => {

      const sql = "SELECT tbl_name FROM sqlite_master WHERE type = 'table'";

      this.db.all(sql, (err, rows) => {

        if(err) {
          return reject("database error");
        }

        this._tables = rows.map(r => r.tbl_name);
        this._initalised = true;

        return resolve();

      });

    });
  }

  /**
   * This will only work if the database was loaded with a filename containing
   * the original hash (ie. world_sql_content_{hex}.content)
   * @return {String} database hash
   */
  getHash() {
    const filename = path.basename(this._filepath);
    return ContentDatabase.parseHash(filename);
  }

  /**
   * Returns JSON content from a table according to a given id
   * @param {String} table - name of the table to query
   * @param {Number|Hash} id - id of the record to return
   * @return {Promise.<Object>} content
   */
  getContent(table, id) {
    return new Promise((resolve, reject) => {

      this.db.get(`SELECT json FROM ${ table } WHERE id = $id`, {
        $id: parseInt(id.toString(), 10) & ContentDatabase.ID_MASK
      }, (err, row) => {

        if(err) {
          return reject(err);
        }

        if(!row || !("json" in row)) {
          return reject(`no match for ${ id } in ${ table }`);
        }

        return resolve(JSON.parse(row.json));

      });

    });
  }

  /**
   * Queries each table for a record matching the given id
   * @param {Number|Hash} id -
   * @return {Promise.<Object>} content
   */
  getAnyContent(id) {
    return new Promise(async (resolve, reject) => {

      if(!this._initalised) {
        await this._init();
      }

      for(const table of this._tables) {
        try {
          return resolve(await this.getContent(table, id));
        }
        catch(err) {
          continue;
        }
      }

      return reject(`no match found for ${ id } in any table`);

    });
  }

  /**
   * @param {String} filename - filename of the database containing a hash
   * @return {String} hash value
   */
  static parseHash(filename) {

    const regex = /world_sql_content_(.+)\.content/i;
    const matches = filename.match(regex);

    if(matches) {
      return matches[1];
    }

    return null;

  }

}

ContentDatabase.ID_MASK = 0xffffffff;
