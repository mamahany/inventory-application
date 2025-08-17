const { Router } = require('express');
const router = Router();
const frameworkController = require('../controllers/frameworkController');

router.get('/', frameworkController.getAllFrameworks);
router.get('/new', frameworkController.createFrameworkGet);
router.post('/new', frameworkController.createFrameworkPost);
router.get('/:id', frameworkController.getFrameworkById);
router.get('/:id/delete', frameworkController.deleteFramework);
router.get('/:id/edit', frameworkController.editFrameworkGet);
router.post('/:id/edit', frameworkController.editFrameworkPost);

module.exports = router;
