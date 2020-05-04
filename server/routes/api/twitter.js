/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')
});

const {
  Router
} = require('express');

const mongodb = require('mongodb');
const mongoose = require('mongoose');

const Twitter = require('twitter');
const Content = require('../../models/content_schema');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var bodyParser = require('body-parser');

const router = new Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

// Get and Add Posts
router.get('/:celebrity', async (req, res) => {
  const {
    params: {
      celebrity
    }
  } = req;

  const posts = await loadPostsCollection();

  const tweets = await scrape("Fanmire_");
  const parsed_tweets = await parse(tweets) // Array of Tweets

  res.json(parsed_tweets);

  // Add Tweets to MongoDB
  (async () => {
    posts.insertMany(parsed_tweets);
  })();
});

async function parse(tweets) {
  var parsed_tweets = [];
  var i;

  for (i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];

    var cut = tweet.full_text.lastIndexOf("https");
    var images = [];

    var j;
    for (j = 0; j < tweet.entities.media.length; j++) {
      images.push(tweet.entities.media[j].media_url);
    }

    var parsed_tweet = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Twitter',
      user_name: tweet.user.name,
      user_handle: "@" + tweet.user.screen_name,
      content_text: tweet.full_text.slice(0, cut),
      content_images: images,
      likes: tweet.favorite_count,
      retweets: "Retweets: " + tweet.retweet_count,
      created_date: tweet.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
        "$1 $2, $4 at $3")
    });
    parsed_tweets.push(parsed_tweet);
  }
  
  return parsed_tweets;
}

async function scrape(screen_name) {
  return await client.get('statuses/user_timeline', {
    screen_name: screen_name,
    tweet_mode: 'extended',
    count: 20
  });
}

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;
