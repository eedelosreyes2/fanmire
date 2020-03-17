const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();

// Middleware
server.use(bodyParser.json());
server.use(cors());

const posts = require('./routes/api/posts');

server.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
