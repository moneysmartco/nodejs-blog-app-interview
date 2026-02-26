const db = require('../db/database');

const Article = {
  findAll({ status, author_id } = {}) {
    const conditions = [];
    const values = [];

    if (status)    { conditions.push('ar.status = ?');    values.push(status); }
    if (author_id) { conditions.push('ar.author_id = ?'); values.push(author_id); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    return db.prepare(`
      SELECT ar.id, ar.title, ar.content, ar.status, ar.created_at, ar.updated_at,
             au.id as author_id, u.name as author_name
      FROM articles ar
      JOIN authors au ON au.id = ar.author_id
      JOIN users   u  ON u.id  = au.user_id
      ${where}
      ORDER BY ar.created_at DESC
    `).all(...values);
  },

  findById(id) {
    return db.prepare(`
      SELECT ar.id, ar.title, ar.content, ar.status, ar.created_at, ar.updated_at,
             au.id as author_id, u.name as author_name
      FROM articles ar
      JOIN authors au ON au.id = ar.author_id
      JOIN users   u  ON u.id  = au.user_id
      WHERE ar.id = ?
    `).get(id);
  },

  create({ author_id, title, content, status = 'draft' }) {
    const stmt = db.prepare(
      'INSERT INTO articles (author_id, title, content, status) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(author_id, title, content, status);
    return this.findById(result.lastInsertRowid);
  },

  update(id, { title, content, status }) {
    const fields = [];
    const values = [];

    if (title   !== undefined) { fields.push('title = ?');   values.push(title); }
    if (content !== undefined) { fields.push('content = ?'); values.push(content); }
    if (status  !== undefined) { fields.push('status = ?');  values.push(status); }

    if (fields.length === 0) return this.findById(id);

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    db.prepare(`UPDATE articles SET ${fields.join(', ')} WHERE id = ?`).run(...values);
    return this.findById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM articles WHERE id = ?').run(id);
  },
};

module.exports = Article;
