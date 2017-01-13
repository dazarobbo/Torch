import sqlite3 from "sqlite3";

/**
 *
 */
export default class ContentDatabase {

  constructor(sqlFile) {
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

}

ContentDatabase.ID_MASK = 0xffffffff;
