const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //  Méthode verify de jwt permet de vérifier la validité d'un token
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      //  s'arrete si le Id n'est pas connu
      throw 'User ID non valable !';
    } else {
      //  Sinon poursuit vers la fonction
      next();
    }
  } catch (error) {
    //  en cas d'erreurs
    res.status(401).json({ error: error | 'Requête non authentifiée !' });
  }
};
