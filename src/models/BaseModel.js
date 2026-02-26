const db = require('../db/database');

class BaseModel {
  constructor(table) {
    this.table = table;
    this.db = db;
  }

  findAll() {
    return this.db.prepare(`SELECT * FROM ${this.table}`).all();
  }

  findById(id) {
    return this.db.prepare(`SELECT * FROM ${this.table} WHERE id = ?`).get(id);
  }

  delete(id) {
    return this.db.prepare(`DELETE FROM ${this.table} WHERE id = ?`).run(id);
  }
}

module.exports = BaseModel;
