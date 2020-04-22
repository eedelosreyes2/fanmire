const axios = require('axios');
const url = require('url');
const Instagram = require('node-instagram').default;
const express = require('express');

const INSTAGRAM_AUTH = {
  clientId: "661075011129053",
  clientSecret: "2aee36805e8b6975591eb42878c1f493",
};
const instagram = new Instagram(INSTAGRAM_AUTH);
const redirectUri = 'https://localhost:3000/auth/instagram/callback/';

// create express server
const https = require('https');
const fs = require('fs');
const app = express();


// Redirect user to instagram oauth
app.get('/auth/instagram', (req, res) => {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ["user_profile", "user_media"] }));
});

// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', async (req, res) => {
  try {
    const { access_token } = await instagram.authorizeUser(req.query.code, redirectUri);
    // in theory, you'd kick off the scraping here or something...
    // but for testing it might be easier to redirect you to an
    // endpoint so you can just refresh with the token instead
    // of having to go through the auth flow every time
    res.redirect(url.format({
      pathname: '/account',
      query: { access_token }
    }));
  } catch (err) {
    res.json(err);
  }
});

app.get('/account', async (req, res) => {
  const { query: { access_token } } = req;
  const accountInfo = await fetchInstagramAccount({ access_token });
  res.json(accountInfo);
});

const fetchInstagramAccount = async ({ access_token }) => {
  // Fetch the userId tied to the access_token so we can grab user data
  const accountInfo = await fetchAccountData({
    access_token,
    fields: ['id']
  });

  // Fetch user media
  const mediaData = await fetchProfileMedia({
    ...accountInfo,
    access_token,
    fields: ['id', 'media_type', 'permalink', 'caption', 'media_url', 'timestamp'],
  });
  return { ...accountInfo, media: mediaData };
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
const fetchProfileMedia = async ({ id, access_token, fields }) => {
  console.log(id);
  const graphURL = `https://graph.instagram.com/${id}/media`;
  return axios
    .get(`${graphURL}?fields=${fields.join(',')}&access_token=${access_token}`)
    .then(({ data: { data } }) => data);
};

/**
 * Given an access token and array of fields, fetch high level data of the account
 * for the given access token
 *
 * @param access_token
 * @param fields
 * @returns {Promise<AxiosResponse<T>>}
 */
const fetchAccountData = async ({ access_token, fields }) => {
  const graphURL = 'https://graph.instagram.com/me';
  return axios
    .get(`${graphURL}?fields=${fields.join(',')}&access_token=${access_token}`)
    .then(({ data }) => data);
};

// listen to port 3000
https.createServer({
  cert: fs.readFileSync('../../server.cert'),
  key: fs.readFileSync('../../server.key')
}, app).listen(3000, () => {
  console.log('app listening on https://localhost:3000');
});
