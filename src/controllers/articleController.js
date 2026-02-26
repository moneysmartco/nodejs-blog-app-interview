const Article = require('../models/Article');
const Author = require('../models/Author');

function listArticles(req, res, next) {
  try {
    // Supports ?status=published&author_id=1
    const { status, author_id } = req.query;
    const articles = Article.findAll({ status, author_id });
    res.json(articles);
  } catch (err) {
    next(err);
  }
}

function getArticle(req, res, next) {
  try {
    const article = Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
}

function createArticle(req, res, next) {
  try {
    const { author_id, title, content, status } = req.body;
    if (!author_id || !title || !content) {
      return res.status(400).json({ error: 'author_id, title, and content are required' });
    }

    if (!Author.findById(author_id)) {
      return res.status(404).json({ error: 'Author not found' });
    }

    if (status && !['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: 'status must be "draft" or "published"' });
    }

    const article = Article.create({ author_id, title, content, status });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

function updateArticle(req, res, next) {
  try {
    const article = Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const { status } = req.body;
    if (status && !['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: 'status must be "draft" or "published"' });
    }

    const updated = Article.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteArticle(req, res, next) {
  try {
    const article = Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    Article.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listArticles, getArticle, createArticle, updateArticle, deleteArticle };
