const express = require('express');
const db = require('./models');
// Donne accès au chemin du système de fichiers
const path = require('path');

// Importation de helmet - aide à protéger l'application de certaines des vulnérabilités connues du Web en configurant de manière appropriée des en-têtes HTTP
const helmet = require('helmet');

// Importation du package de limite de débit
const rateLimit = require('express-rate-limit');

// routes
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

// Package dotenv (variable d'environnement)
const dotenv = require('dotenv');
dotenv.config();

// Limite le nombre de requêtes par IP envoyées vers le serveur Express
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limiter chaque IP à 500 requêtes par `window` de 15 minutes
  message: 'trop de requete',
  standardHeaders: true, // Renvoie les informations de limite de débit dans les en-têtes
  legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
});

const app = express(); // create a new express app

app.get('/', (req, res) => {
  res.send('App running');
});

// Applique le middleware de limitation de débit à toutes les requêtes
app.use(limiter);

//helmet
app.use(helmet());

// Gestion des CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Conversions JSON "body parser"
app.use(express.json());

//routes
app.use('/api/users', usersRoutes); //modif enleve des slash
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

//multer
app.use('/images', express.static(path.join(__dirname, 'images')));

db.sequelize.sync();

module.exports = app;
