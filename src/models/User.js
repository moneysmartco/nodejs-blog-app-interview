const BaseModel = require('./BaseModel');

class User extends BaseModel {
  constructor() {
    super('users');
  }

  findAll() {
    return this.db.prepare(
      'SELECT id, name, email, created_at FROM users'
    ).all();
  }

  findById(id) {
    return this.db.prepare(
      'SELECT id, name, email, created_at FROM users WHERE id = ?'
    ).get(id);
  }

  findByEmail(email) {
    return this.db.prepare(
      'SELECT id, name, email, created_at FROM users WHERE email = ?'
    ).get(email);
  }

  create({ name, email, password }) {
    const result = this.db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    ).run(name, email, password);
    return this.findById(result.lastInsertRowid);
  }

  update(id, { name, email }) {
    const fields = [];
    const values = [];

    if (name  !== undefined) { fields.push('name = ?');  values.push(name); }
    if (email !== undefined) { fields.push('email = ?'); values.push(email); }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    this.db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
    return this.findById(id);
  }
}

module.exports = new User();
