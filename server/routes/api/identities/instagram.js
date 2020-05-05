const {
  Router
} = require('express');
const axios = require('axios');
const url = require('url');
const Instagram = require('node-instagram').default;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Content = require('../../../models/content_schema');

const INSTAGRAM_AUTH = {
  clientId: "322410165391044",
  clientSecret: "fc9719c5da4846739f2720a44ed41327",
};
const instagram = new Instagram(INSTAGRAM_AUTH);
const redirectUri = 'https://localhost:5000/api/identity/instagram';

const router = new Router();

router.get('/oauth', (req, res) => {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, {
    scope: ["user_profile", "user_media"]
  }));
});

// Handle auth code and get access_token for user
router.get('/', async (req, res) => {
  try {
    const {
      access_token
    } = await instagram.authorizeUser(req.query.code, redirectUri);
    const posts = await loadPostsCollection();
    const accountInfo = await fetchInstagramAccount({
      access_token
    });
    const parsed_posts = await parse(accountInfo);
    // TODO: store this in mongo
    //console.log(accountInfo);
    //  res.json(accountInfo);

  } catch (err) {
    console.log(err);
  }
  // redirect them back to the app
  res.redirect('https://localhost:8080/');
});

(async () => {
  posts.insertMany(parsed_posts);
});

async function parse(accountInfo) {
  var parsed_posts = [];
  var i;

  for (i = 0; i < accountInfo.media.length; i++) {
    var post = accountInfo.media[i];
    var images = [];
    images.push(post.media_url);
    var parsed_post = new Content({
      _id: new mongoose.Types.ObjectId(),
      social_media: 'Instagram',
      user_name: post.username,
      content_images: images,
      content_text: post.caption,
      created_date: post.timestamp
    });
    parsed_posts.push(parsed_post);
  }
  console.log(parsed_posts);
  return parsed_posts;
}

const fetchInstagramAccount = async ({
  access_token
}) => {
  // Fetch the userId tied to the access_token so we can grab user data
  const accountInfo = await fetchAccountData({
    access_token,
    fields: ['id']
  });


  //     fields: ['id', 'media_type', 'permalink', 'caption', 'media_url', 'timestamp'],
  // Fetch user media
  const mediaData = await fetchProfileMedia({
    ...accountInfo,
    access_token,
    fields: ['username', 'media_url', 'caption', 'timestamp'],
  });
  return {
    ...accountInfo,
    media: mediaData
  };
};

/**
 * Given an access token and array of fields, fetch the instagram user's media
 * returning a JSON object containing the specified fields.
 *
 * See https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields for
 * returnable fields
 *
 * @param access_token
 * @param fields
 * @returns {Promise<AxiosResponse<T>>}
 */
const fetchProfileMedia = async ({
  id,
  access_token,
  fields
}) => {
  //console.log(id);
  const graphURL = `https://graph.instagram.com/${id}/media`;
  return axios
    .get(`${graphURL}?fields=${fields.join(',')}&access_token=${access_token}`)
    .then(({
      data: {
        data
      }
    }) => data);
};

/**
 * Given an access token and array of fields, fetch high level data of the account
 * for the given access token
 *
 * @param access_token
 * @param fields
 * @returns {Promise<AxiosResponse<T>>}
 */
const fetchAccountData = async ({
  access_token,
  fields
}) => {
  const graphURL = 'https://graph.instagram.com/me';
  return axios
    .get(`${graphURL}?fields=${fields.join(',')}&access_token=${access_token}`)
    .then(({
      data
    }) => data);
};

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db(process.env.MONGODB_NAME).collection('posts');
}

module.exports = router;