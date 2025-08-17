const {Router} = require('express');
const router = Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthors);
router.get('/new', authorController.createAuthorGet);
router.post('/new', authorController.createAuthorPost);
router.get('/:id', authorController.getAuthorById);
router.get('/:id/delete', authorController.deleteAuthor);
router.get('/:id/edit', authorController.editAuthorGet);
router.post('/:id/edit', authorController.editAuthorPost);

module.exports = router;