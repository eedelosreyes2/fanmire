/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')
});

const fs = require('fs');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {
  screen_name: 'corona'
};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    fs.writeFileSync("./data/tweets.json", JSON.stringify(tweets, null, 4));
  }
});