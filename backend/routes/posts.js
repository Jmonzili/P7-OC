// Importation de express
const express = require("express");

// Fonction  Router()
const router = express.Router();

// Importation du contrôleur pour les posts
const postsCtrl = require("../controllers/posts");

// Importation du contrôleur pour les likes
const likesCtrl = require("../controllers/likes");

// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Importation du middleware multer pour la gestion des images
const multer = require("../middleware/multer-config");

// Création des routes posts
router.post("/", auth, multer, postsCtrl.createPost);
router.put("/update/:postId", auth, multer, postsCtrl.updatePost);
router.delete("/delete/:postId", auth, postsCtrl.deletePost);
router.get("/", auth, postsCtrl.readAllPosts);
router.get("/:userId", auth, postsCtrl.readAllPostUser);
router.get("/profile/:postId", auth, postsCtrl.userProfileByPost);
router.get("/onPost/:postId", auth, postsCtrl.readOnePost);

router.post("/:postId/like", auth, likesCtrl.likePost);
router.get("/:postId/like", auth, likesCtrl.readAllLikes);

// Exportation du module
module.exports = router;
