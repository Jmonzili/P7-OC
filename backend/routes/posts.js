//  Importation
const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const likesCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Création des routes posts
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/update/:postId', auth, multer, postsCtrl.updatePost);
router.delete('/delete/:postId', auth, postsCtrl.deletePost);
router.get('/', auth, postsCtrl.readAllPosts);
router.get('/:userId', auth, postsCtrl.readAllPostUser);
router.get('/profile/:postId', auth, postsCtrl.userProfileByPost);
router.get('/onPost/:postId', auth, postsCtrl.readOnePost);

router.post('/:postId/like', auth, likesCtrl.likePost);
router.get('/:postId/like', auth, likesCtrl.readAllLikes);

// Exportation des routes
module.exports = router;
