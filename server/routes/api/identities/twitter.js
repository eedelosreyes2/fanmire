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

/* Social Media Scrapers */
const TwitterScraper = require('../TwitterScraper');
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
  // Skip for now because we only have one celebrity - Fanmire

  // 2. Update posts and send
  const posts = await loadPostsCollection();

  // Add Tweets
  (async () => {
    const tweets = await twitter_scraper.scrape("Fanmire_");
    const parsed_tweets = await twitter_scraper.parse(tweets); // Array of Tweets
    posts.insertOne(parsed_tweets);
  })();


  res.send(await posts.find({}).toArray());
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;