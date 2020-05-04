/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../../.env')
});

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

    for (i = 0; i < data.length; i++) {
      var post = data[i];

      //var cut = post.full_text.lastIndexOf("https");
      var images = [];

      var j;
      for (j = 0; j < post.data.length; j++) {
        images.push(post.data.picture);
      }

      var parsed_post = new Content({
        _id: new mongoose.Types.ObjectId(),
        social_media: 'Facebook',
        user_name: data.name,
        content_text: post.message.slice(0, cut),
        content_images: images,
        created_date: post.created_at.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/,
          "$1 $2, $4 at $3")
      });
      parsed_posts.push(parsed_post);
    }
    console.log(parsed_posts);
    return parsed_posts;
  }


router.post('/', async (req, res) => {
  const {
    body: {
      access_token
    }
  } = req;

  const URL = 'https://graph.facebook.com/v6.0/me';
  const userFieldSet = 'name,posts,photos';

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

  // TODO: Make into content format
  res.json(data); //data is an array of facebook posts
  //console.log(data);
  const parsed_data = await parse(data)

  await posts.insertMany(parsed_data);
});



async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;
