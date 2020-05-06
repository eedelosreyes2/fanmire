/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../../.env')
});

const Content = require('../../../models/content_schema');

const {
  Router
} = require('express');
const axios = require('axios');

const router = new Router();

const mongodb = require('mongodb');
const mongoose = require('mongoose');

//TODO: make a parse function
async function parse(data) {

  var parsed_posts = [];
  var i;

  //iterate through posts
  //console.log(data.accounts.data[0].posts.data.length)
  for (i = 0; i < data.accounts.data[0].posts.data.length; i++) {
    var post = data.accounts.data[0].posts.data[i];

    //console.log(post)

    var images = [];

    images.push(post.picture);

    var parsed_post = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Facebook',
      user_name: data.accounts.data[0].name,
      content_text: post.message,
      content_images: images,
      created_date: Date.parse(post.created_time)
    });
    parsed_posts.push(parsed_post);
  }
  //do the same for the photos
  return parsed_posts;
}


router.post('/', async (req, res) => {
  const {
    body: {
      access_token
    }
  } = req;

  const URL = 'https://graph.facebook.com/v6.0/me';
  const userFieldSet = 'accounts{name,posts{message,picture,created_time}}';

  const options = {
    params: {
      access_token,
      fields: userFieldSet
    }
  };

  const posts = await loadPostsCollection();

  const {
    data
  } = await axios.get(URL, options)

  //console.log(data);

  //Make into content format
  const parsed_data = await parse(data)

  console.log(parsed_data);

  res.json(parsed_data);

  // Add Tweets to MongoDB
  // (async () => {
  //   posts.insertMany(parsed_data);
  // })();
   await posts.insertMany(parsed_data);
   //console.log(posts);
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;
