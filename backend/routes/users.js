// Importation
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const emailControle = require('../middleware/emailControle');
const password = require('../middleware/password');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes utilisateurs
router.post('/signup', emailControle, password, usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/', auth, usersCtrl.getAllUsers);
router.get('/profile/:id', auth, usersCtrl.userProfile);
router.put('/profile/update/:id', auth, multer, usersCtrl.modifyProfile);
router.delete('/profile/delete/:id', auth, multer, usersCtrl.deleteProfile);

// Exportation des routes
module.exports = router;
