const { Router } = require('express');
const router = Router();
const languageController = require('../controllers/languageController');

router.get('/', languageController.getAllLanguages);
router.get('/new', languageController.createLanguageGet);
router.post('/new', languageController.createLanguagePost);
router.get('/:id', languageController.getLanguageById);
router.get('/:id/delete', languageController.deleteLanguage);
router.get('/:id/edit', languageController.editLanguageGet);
router.post('/:id/edit', languageController.editLanguagePost);

module.exports = router;