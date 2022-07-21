// Importation
const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes comments
router.post('/:postId', auth, multer, commentsCtrl.createComment);
router.get('/:postId', auth, commentsCtrl.readAllComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

// Exportation des routes
module.exports = router;
