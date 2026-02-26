const { Router } = require('express');
const { listUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = Router();

router.get('/',    listUsers);
router.post('/',   createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
