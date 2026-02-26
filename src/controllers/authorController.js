const Author = require('../models/Author');
const User = require('../models/User');

function listAuthors(req, res, next) {
  try {
    const authors = Author.findAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
}

function getAuthor(req, res, next) {
  try {
    const author = Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
}

function createAuthor(req, res, next) {
  try {
    const { user_id, bio } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    if (!User.findById(user_id)) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (Author.findByUserId(user_id)) {
      return res.status(409).json({ error: 'User is already an author' });
    }

    const author = Author.create({ user_id, bio });
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
}

function updateAuthor(req, res, next) {
  try {
    const author = Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const updated = Author.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

module.exports = { listAuthors, getAuthor, createAuthor, updateAuthor };
