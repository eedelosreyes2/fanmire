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

class TwitterScraper {
  async scrape(screen_name) {
    return await client.get('statuses/user_timeline', {
      screen_name: screen_name,
      count: 20
    });

    /* If return await doesn't work, then wrap in Promise */
    // return new Promise((resolve, reject) => {
    //   client.get('statuses/user_timeline', {
    //     screen_name: screen_name
    //   }, function(error, tweets, response) {
    //     if (!error) {
    //       resolve(tweets);
    //     } else {
    //       reject(error);
    //     }
    //   });
    // })
  }
}

module.exports = TwitterScraper