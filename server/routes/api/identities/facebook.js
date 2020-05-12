/* Retrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../../.env')
});

//content schema
const Content = require('../../../models/content_schema');

const {
  Router
} = require('express');
const axios = require('axios');

const router = new Router();

//required for parsing the json response and putting in the database
const mongodb = require('mongodb');
const mongoose = require('mongoose');

//parse function to take JSON response and put it in content schema format
async function parse(data) {

  var parsed_posts = [];
  var i;

  //iterate through posts
  for (i = 0; i < data.accounts.data[0].posts.data.length; i++) {
    //get each individual post
    var post = data.accounts.data[0].posts.data[i];

    var images = [];

    //grab images from the post
    images.push(post.picture);

    //parse the rest of the fields of the post ie message, created time, name
    var parsed_post = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Facebook',
      user_name: data.accounts.data[0].name,
      content_text: post.message,
      content_images: images,
      created_date: Date.parse(post.created_time)
    });
    //add parsed_post to array of parsed posts
    parsed_posts.push(parsed_post);
  }
  //return array of parsed posts
  return parsed_posts;
}

router.post('/', async (req, res) => {
  const {
    body: {
      access_token
    }
  } = req;

  //call to facebook graph api, include the fields you want to pull
  const URL = 'https://graph.facebook.com/v6.0/me';
  //get the fan pages linked to the influencer's account, and pull the posts from that page
  const userFieldSet = 'accounts{name,posts{message,picture,created_time}}';

  const options = {
    params: {
      access_token,
      fields: userFieldSet
    }
  };

  //load posts collection
  const posts = await loadPostsCollection();

  //get the data from facebook graph api
  const {
    data
  } = await axios.get(URL, options)

  //parse data into content schema format
  const parsed_data = await parse(data)

  console.log(parsed_data);

  res.json(parsed_data);

  //insert the parsed data into the database
  await posts.insertMany(parsed_data);
});

//function to load posts collection and post to database
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;
