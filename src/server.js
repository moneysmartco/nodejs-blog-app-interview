const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`  GET  /api/users`);
  console.log(`  POST /api/users`);
  console.log(`  GET  /api/users/:id`);
  console.log(`  PUT  /api/users/:id`);
  console.log(`  DELETE /api/users/:id`);
  console.log(`  GET  /api/authors`);
  console.log(`  POST /api/authors`);
  console.log(`  GET  /api/authors/:id`);
  console.log(`  PUT  /api/authors/:id`);
  console.log(`  GET  /api/articles`);
  console.log(`  POST /api/articles`);
  console.log(`  GET  /api/articles/:id`);
  console.log(`  PUT  /api/articles/:id`);
  console.log(`  DELETE /api/articles/:id`);
});
