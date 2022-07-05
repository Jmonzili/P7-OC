// Ajout des dépendances
const express = require("express")
require('dotenv').config({path: './config/.env'});
const app = express()

// Connection à database
require('./config/db');

// Listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})