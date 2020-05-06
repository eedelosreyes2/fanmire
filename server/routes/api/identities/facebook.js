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
  for (i = 0; i < data.posts.data.length; i++) {
    var post = data.posts.data[i];

    var images = [];

    images.push(post.picture);

    var parsed_post = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Facebook',
      user_name: data.name,
      content_text: post.message,
      content_images: images,
      created_date: Date.parse(post.created_time)
    });
    parsed_posts.push(parsed_post);
  }

  //do the same for the photos
  var j;
  for (j = 0; j < data.photos.data.length; j++) {
    var photo = data.photos.data[j];

    var images = [];
    images.push(photo.picture);

    var parsed_photo = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Facebook',
      user_name: data.name,
      content_images: images,
      created_date: Date.parse(photo.created_time)
    });
    parsed_posts.push(parsed_photo);
  }
  return parsed_posts;
}


router.post('/', async (req, res) => {
  const {
    body: {
      access_token
    }
  } = req;

  const URL = 'https://graph.facebook.com/v6.0/me';
  const userFieldSet = 'name,posts{picture,message,created_time},photos{picture,created_time}';

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

  //Make into content format
  const parsed_data = await parse(data)

  console.log(parsed_data);

  res.json(parsed_data);

  // Add Tweets to MongoDB
  // (async () => {
  //   posts.insertMany(parsed_data);
  // })();
   await posts.insertMany(parsed_data);
   console.log(posts);
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;
