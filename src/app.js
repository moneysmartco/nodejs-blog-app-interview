const express = require('express');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const userRoutes = require('./routes/users');
const authorRoutes = require('./routes/authors');
const articleRoutes = require('./routes/articles');

const app = express();

// Body parsing
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/articles', articleRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
