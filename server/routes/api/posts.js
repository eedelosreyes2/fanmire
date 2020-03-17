const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date() // will change this later to posts from SM
  });
  res.status(201).send();
});

// Delete Post


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('MONGODBSTRING', {
    useNewUrlParser: true
  });

  return client.db('MONGODBNAME').collection('posts');
}

module.exports = router;
