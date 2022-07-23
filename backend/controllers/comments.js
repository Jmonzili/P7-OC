// Importation des models, du système de fichiers et de Json web Token
const { User, Post, Comment } = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Importation de Dotenv pour utiliser les variables d'environnement
const dotenv = require('dotenv');

dotenv.config();

// CTRL de création des commentaires
exports.createComment = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const attachmentURL = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : '';
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('account not found!');
    } else {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });
      const comment = await Comment.create({
        username: user.username,
        content: req.body.content,
        attachment: attachmentURL,
        PostId: post.id,
        UserId: user.id,
      });
      res.status(201).json({ comment });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// CTRL de lecture des commentaires
exports.readAllComment = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      attributes: [
        'id',
        'userId',
        'postId',
        'username',
        'content',
        'attachment',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
      where: { postId: req.params.postId },
    });
    if (comments) {
      res.json(comments);
    } else {
      throw new Error('There are no comments');
    }
  } catch (error) {
    return res.status(500).json({
      error: 'An error has occurred',
    });
  }
};

//  Suppression de commentaire
exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;

  try {
    const comment = await Comment.findOne({
      where: { id: req.params.id },
    });
    const userAdmin = await User.findOne({
      where: { id: userId },
    });

    if (userId === comment.UserId || userAdmin.isAdmin === true) {
      if (comment.attachment != null) {
        const filename = comment.attachment.split('/images/')[1];

        fs.unlink(`images/${filename}`, () => {
          Comment.destroy({
            where: { id: req.params.id },
          });
          res
            .status(200)
            .json({ message: 'you have succesfully deleted this comment !' });
        });
      } else {
        Comment.destroy({
          where: { id: req.params.id },
        });
        res
          .status(200)
          .json({ message: 'you have succesfully deleted this comment !' });
      }
    } else {
      return res.status(403).json({ message: 'unauthorized access!' });
    }
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};
