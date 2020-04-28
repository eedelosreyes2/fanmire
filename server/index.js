const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
const https = require("https");

// Middleware
server.use(bodyParser.json());
server.use(cors());

const apiRoutes = require('./routes/api');

server.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

console.log(process.env);

// https.createServer({
//   key: process.env.SERVER_KEY,
//   cert: process.env.SERVER_CERT
// }, server)
// .listen(PORT, function () {
//   console.log('Example app listening on port 5000! Go to https://localhost:5000/')
// })

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
