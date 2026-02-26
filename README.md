# Blog API

A clean REST API starter for a blog platform with **User**, **Author**, and **Article** models.
Built with Express + SQLite (`better-sqlite3`). No ORM — raw SQL so everything is transparent.

## Setup

```bash
npm install
npm run dev      # development with auto-reload
npm start        # production
```

The database file `blog.db` is created automatically on first run and seeded with sample data.

---

## Data Model

```
User ──< Author ──< Article
```

- A **User** is anyone with an account (name, email, password).
- An **Author** is a User who has been promoted to write articles (has a bio).
- An **Article** belongs to an Author and has a `draft` / `published` status.

---

## API Reference

### Users

| Method | Path            | Description        |
|--------|-----------------|--------------------|
| GET    | /api/users      | List all users     |
| POST   | /api/users      | Create a user      |
| GET    | /api/users/:id  | Get user by id     |
| PUT    | /api/users/:id  | Update user        |
| DELETE | /api/users/:id  | Delete user        |

**POST /api/users** body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret" }
```

---

### Authors

| Method | Path              | Description         |
|--------|-------------------|---------------------|
| GET    | /api/authors      | List all authors    |
| POST   | /api/authors      | Promote user to author |
| GET    | /api/authors/:id  | Get author by id    |
| PUT    | /api/authors/:id  | Update author bio   |

**POST /api/authors** body:
```json
{ "user_id": 1, "bio": "Writes about tech." }
```

---

### Articles

| Method | Path               | Description          |
|--------|--------------------|----------------------|
| GET    | /api/articles      | List articles        |
| POST   | /api/articles      | Create article       |
| GET    | /api/articles/:id  | Get article by id    |
| PUT    | /api/articles/:id  | Update article       |
| DELETE | /api/articles/:id  | Delete article       |

**GET /api/articles** query params:
- `?status=published` — filter by status (`draft` or `published`)
- `?author_id=1` — filter by author

**POST /api/articles** body:
```json
{
  "author_id": 1,
  "title": "My First Post",
  "content": "Hello world!",
  "status": "draft"
}
```

---

## Project Structure

```
src/
├── server.js          # Entry point
├── app.js             # Express app setup
├── db/
│   └── database.js    # SQLite connection, schema, seed
├── models/
│   ├── User.js        # DB queries for users
│   ├── Author.js      # DB queries for authors
│   └── Article.js     # DB queries for articles
├── controllers/
│   ├── userController.js
│   ├── authorController.js
│   └── articleController.js
├── routes/
│   ├── users.js
│   ├── authors.js
│   └── articles.js
└── middleware/
    └── errorHandler.js
```

## Ideas for Extension

- Add JWT authentication (login / register flow)
- Add pagination to list endpoints
- Add `tags` or `categories` to articles (many-to-many)
- Add comments (Comment model → Article)
- Add search / full-text search on articles
- Add image upload for article cover photos
- Add rate limiting middleware
- Add input validation with `zod` or `joi`
- Write tests with `vitest` or `jest` + `supertest`
