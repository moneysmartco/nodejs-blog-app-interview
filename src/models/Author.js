const BaseModel = require('./BaseModel');

class Author extends BaseModel {
  constructor() {
    super('authors');
  }

  findAll() {
    return this.db.prepare(`
      SELECT a.id, a.bio, a.created_at,
             u.id as user_id, u.name, u.email
      FROM authors a
      JOIN users u ON u.id = a.user_id
    `).all();
  }

  findById(id) {
    return this.db.prepare(`
      SELECT a.id, a.bio, a.created_at,
             u.id as user_id, u.name, u.email
      FROM authors a
      JOIN users u ON u.id = a.user_id
      WHERE a.id = ?
    `).get(id);
  }

  findByUserId(userId) {
    return this.db.prepare(`
      SELECT a.id, a.bio, a.created_at,
             u.id as user_id, u.name, u.email
      FROM authors a
      JOIN users u ON u.id = a.user_id
      WHERE a.user_id = ?
    `).get(userId);
  }

  create({ user_id, bio }) {
    const result = this.db.prepare(
      'INSERT INTO authors (user_id, bio) VALUES (?, ?)'
    ).run(user_id, bio || null);
    return this.findById(result.lastInsertRowid);
  }

  update(id, { bio }) {
    this.db.prepare('UPDATE authors SET bio = ? WHERE id = ?').run(bio, id);
    return this.findById(id);
  }
}

module.exports = new Author();
