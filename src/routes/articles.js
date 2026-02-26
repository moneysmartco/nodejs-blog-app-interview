const { Router } = require('express');
const { listArticles, getArticle, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');

const router = Router();

router.get('/',    listArticles);   // supports ?status=published&author_id=1
router.post('/',   createArticle);
router.get('/:id', getArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;
