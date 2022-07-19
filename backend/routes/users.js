// Importation de express
const express = require("express");

// Fonction  Router()
const router = express.Router();

// Importation du contrôleur pour les utilisateurs
const usersCtrl = require("../controllers/users");

// Importation du contrôle du format d'un email
const emailControle = require("../middleware/emailControle");

// Importation du contrôle du format d'un mot de passe
const password = require("../middleware/password");

// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Importation du middleware multer pour la gestion des images
const multer = require("../middleware/multer-config");

// Création des routes utilisateurs
router.post("/signup", emailControle, password, usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.get("/", auth, usersCtrl.getAllUsers);
router.get("/profile/:id", auth, usersCtrl.userProfile);
router.put("/profile/update/:id", auth, multer, usersCtrl.modifyProfile);
router.delete("/profile/delete/:id", auth, multer, usersCtrl.deleteProfile);

// Exportation du module
module.exports = router;
