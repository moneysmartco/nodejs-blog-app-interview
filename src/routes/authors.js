const { Router } = require('express');
const { listAuthors, getAuthor, createAuthor, updateAuthor } = require('../controllers/authorController');

const router = Router();

router.get('/',    listAuthors);
router.post('/',   createAuthor);
router.get('/:id', getAuthor);
router.put('/:id', updateAuthor);

module.exports = router;
