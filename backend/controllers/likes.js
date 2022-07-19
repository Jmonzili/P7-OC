// Importation des models, de Json web Token et Dotenv
const { Post, Like } = require('../models');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

// CTRL de création des likes
exports.likePost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const postId = req.params.postId;
  try {
    const user = await Like.findOne({
      where: { userId: userId, postId: postId },
    });
    if (user) {
      await Like.destroy(
        { where: { UserId: userId, PostId: postId } },
        { truncate: true, restartIdentity: true }
      );
      const post = await Post.findOne({ where: { id: postId } });
      Post.update(
        {
          likes: post.likes - 1,
        },
        {
          where: { id: postId },
        }
      );

      return res.status(200).send({ messageRetour: 'you dislike this post' });
    } else {
      await Like.create({
        UserId: userId,
        PostId: postId,
      });
      const post = await Post.findOne({ where: { id: postId } });
      Post.update(
        {
          likes: post.likes + 1,
        },
        {
          where: { id: postId },
        }
      );

      return res.status(201).json({ messageRetour: 'you like this post' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Erreur serveur' });
  }
};

// CTRL de lecture des likes
exports.readAllLikes = async (req, res, next) => {
  try {
    const like = await Post.findAll({
      attributes: ['likes'],
      where: { id: req.params.postId },
    });
    return res.status(201).json(like);
  } catch {
    return res.status(500).json({
      error: 'An error has occurred',
    });
  }
};
