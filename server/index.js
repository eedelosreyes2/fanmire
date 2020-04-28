/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var fs = require("fs")
var https = require("https");

const server = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// https.createServer({
//     key: process.env.SERVER_KEY,
//     cert: process.env.SERVER_CERT
//   }, server)
//   .listen(PORT, function() {
//     console.log('Example app listening on port 5000! Go to https://localhost:5000/')
//   })

//server.listen(PORT, () => console.log(`Server running on port ${PORT}`));