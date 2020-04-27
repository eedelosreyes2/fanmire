/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')
});

/* Express Server */
const express = require('express');
const router = express.Router();

/* MongoDB Database*/
const mongodb = require('mongodb');

/* File System */
var fs = require('fs');

/* Social Media Scrapers */
const TwitterScraper = require('./TwitterScraper');
const twitter_scraper = new TwitterScraper;

// Get and Add Posts
router.get('/:celebrity', async (req, res) => {
  const {
    params: {
      celebrity
    }
  } = req;
  // 1. Lookup account details for the given fanmireId
  // which has the their twitter / facebook IDs

  // 2. Update posts and send
  const posts = await loadPostsCollection();

  // Add Tweets
  (async () => {
    const tweets = await twitter_scraper.scrape("Fanmire_");

    var i;
    for (i = 0; i < tweets.length; i++) {
      var post = tweets[i];
      console.log(post);
      // await posts.insertOne({
      //   post
      // });
    }
  })();


  // Send data
  res.send(await posts.find({}).toArray());
});

// Add posts - not used
router.post('/:celebrity', async (req, res) => {
  const posts = await loadPostsCollection();

  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post - not used
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;