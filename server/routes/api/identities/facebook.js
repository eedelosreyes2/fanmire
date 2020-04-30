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

router.post('/', async (req, res) => {
  const {
    body: {
      access_token
    }
  } = req;

  const URL = 'https://graph.facebook.com/v6.0/me';
  const userFieldSet = 'id, name, about, email, link, is_verified, website, picture, photos, feed';

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

  res.json(data);

  (async () => {
    posts.insertOne(data);
  })();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;