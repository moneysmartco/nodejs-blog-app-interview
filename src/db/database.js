const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../blog.db');

const db = new Database(DB_PATH);

// Enable foreign key enforcement
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    email     TEXT    UNIQUE NOT NULL,
    password  TEXT    NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS authors (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER UNIQUE NOT NULL,
    bio        TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS articles (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id  INTEGER NOT NULL,
    title      TEXT    NOT NULL,
    content    TEXT    NOT NULL,
    status     TEXT    NOT NULL DEFAULT 'draft'
                       CHECK (status IN ('draft', 'published')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
  );
`);

// Seed some data if tables are empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
  const insertUser = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  );
  const insertAuthor = db.prepare(
    'INSERT INTO authors (user_id, bio) VALUES (?, ?)'
  );
  const insertArticle = db.prepare(
    'INSERT INTO articles (author_id, title, content, status) VALUES (?, ?, ?, ?)'
  );

  const seed = db.transaction(() => {
    const alice = insertUser.run('Alice Smith', 'alice@example.com', 'hashed_pw_1');
    const bob   = insertUser.run('Bob Jones',  'bob@example.com',   'hashed_pw_2');

    const aliceAuthor = insertAuthor.run(alice.lastInsertRowid, 'Alice writes about tech and coffee.');
    insertAuthor.run(bob.lastInsertRowid, 'Bob covers open source and systems programming.');

    insertArticle.run(aliceAuthor.lastInsertRowid, 'Getting Started with Node.js',
      'Node.js is a JavaScript runtime built on Chrome\'s V8 engine...', 'published');
    insertArticle.run(aliceAuthor.lastInsertRowid, 'Understanding SQLite',
      'SQLite is a self-contained, serverless SQL database engine...', 'draft');
  });

  seed();
  console.log('[db] Seeded initial data');
}

module.exports = db;
