// Importation des models, du système de fichiers, de Json web Token et Dotenv
const { User, Post, Comment } = require('../models');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

// CTRL de création des posts
exports.createPost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  const { title, content } = req.body;
  const attachmentURL = req.file
    ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    : req.body.attachment;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Sorry, we can't find your account");
    } else {
      const post = await Post.create({
        UserId: user.id,
        username: user.username,
        title,
        content,
        attachment: attachmentURL,
      });
      return res.status(201).json(post);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// CTRL de lecture de tous les posts
exports.readAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        'id',
        'userId',
        'username',
        'title',
        'content',
        'attachment',
        'likes',
        'createdAt',
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({
      error: 'An error has occurred',
    });
  }
};

// CTRL de lecture de tous les posts d'un utilisateur
exports.readAllPostUser = async (req, res, next) => {
  try {
    const post = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: {
        model: User,
        attributes: ['id', 'username', 'createdAt'],
      },
      where: { userId: req.params.userId },
    });
    res.status(200).json({ post });
  } catch {
    return res.status(403).json({ message: 'unauthorized access!' });
  }
};

// CTRL de lecture d'un post
exports.readOnePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      throw new Error('Post introuvable');
    }
    res.status(200).json({ post });
  } catch (err) {
    return res.status(403).json({ message: 'unauthorized access!' });
  }
};

// CTRL de lecture d'un utilisateur en rapport avec son post
exports.userProfileByPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      attributes: [
        'id',
        'userId',
        'username',
        'title',
        'content',
        'attachment',
        'likes',
        'createdAt',
      ],
      where: { id: req.params.postId },
    });
    const user = await User.findOne({
      attributes: { exclude: ['email', 'password'] },
      where: { username: post.username },
    });

    if (!user) {
      throw new Error('account not found!');
    }
    res.status(200).json({ user });
  } catch (err) {
    return res.status(403).json({ message: 'unauthorized access!' });
  }
};

// CTRL de modification d'un post
exports.updatePost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  try {
    const { title, content } = req.body;
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      throw new Error('post not found!');
    } else {
      const user = await User.findOne({
        where: { id: userId },
      });
      if (userId === post.UserId || user.isAdmin === true) {
        post.update({
          title: title || post.title,
          content: content || post.content,
        });
        res.status(200).json({ post });
      } else {
        return res.status(403).json({ message: 'unauthorized access!' });
      }
    }
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};

// CTRL de suppression d'un post
exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  const userId = decodedToken.userId;
  try {
    const post = await Post.findOne({
      attributes: [
        'id',
        'userId',
        'username',
        'title',
        'content',
        'attachment',
        'likes',
        'createdAt',
      ],
      where: { id: req.params.postId },
    });

    if (!post) {
      throw new Error('post not found!');
    } else {
      const user = await User.findOne({
        where: { id: userId },
      });

      if (userId === post.dataValues.userId || user.isAdmin === true) {
        const comment = await Comment.findAll({
          attributes: ['PostId', 'attachment'],
          where: { PostId: post.id },
        });

        if (comment != null) {
          for (i = 0; i < comment.length; i++) {
            const filename = comment[i].attachment.split('/images/')[1];
            console.log(filename);
            fs.unlink(`images/${filename}`, () => {
              Comment.destroy({
                where: { PostId: post.id },
              });
            });
          }

          if (post.attachment != null) {
            const filename = post.attachment.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {
              Post.destroy({
                where: { id: req.params.postId },
              });
              res.status(200).json({ message: 'your post has been deleted' });
            });
          } else {
            Post.destroy({
              where: { id: req.params.postId },
            });
            res.status(200).json({ message: 'your post has been deleted' });
          }
        } else {
          if (post.attachment != null) {
            console.log('le post a une image');
            const filename = post.attachment.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {
              Post.destroy({
                where: { id: req.params.postId },
              });
              res.status(200).json({ message: 'your post has been deleted' });
            });
          } else {
            Post.destroy({
              where: { id: req.params.postId },
            });
            res.status(200).json({ message: 'your post has been deleted' });
          }
        }
      } else {
        return res.status(403).json({ message: 'unauthorized access!' });
      }
    }
  } catch {
    return res.status(500).json({ err: 'An error occured' });
  }
};
