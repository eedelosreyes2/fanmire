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

<<<<<<< HEAD
  const { data } = await axios.get(URL, options)
  (async () => {
    data.insertOne(json(data));
  })();
=======
  const {
    data
  } = await axios.get(URL, options)
>>>>>>> 7808afca1c7c877f80f6ccf807f76493896a3ecd
  // TODO: store in mongo... then send status of 200?  Or send entire user profile?
  res.json(data);
});



  async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return client.db(process.env.MONGODB_NAME).collection('posts');
  }
});

module.exports = router;