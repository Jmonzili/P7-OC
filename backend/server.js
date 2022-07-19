// Importation du package http natif de node

const http = require('http');
const app = require('./app');
const { sequelize } = require('./models');

// Importation de dotenv
const dotenv = require('dotenv');
dotenv.config();

// normalizePort renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// Je configure le serveur pour qu'il écoute le port 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Recherche les différentes erreurs, les gère, les enregistre dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

app.on('error', errorHandler);

// Listen
app.listen(port, async () => {
  console.log(`Connection établie sur le port : ${port}`);
  await sequelize.authenticate();
  console.log('Connection à la base de donnée réussie');
});
