const { Router } = require('express');
const axios = require('axios');
const url = require('url');
const Instagram = require('node-instagram').default;

const INSTAGRAM_AUTH = {
  clientId: "322410165391044",
  clientSecret: "fc9719c5da4846739f2720a44ed41327",
};
const instagram = new Instagram(INSTAGRAM_AUTH);
const redirectUri = 'https://localhost:5000/api/identity/instagram';


const router = new Router();

router.get('/oauth', (req, res) => {
    res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ["user_profile", "user_media"] }));
});

// Handle auth code and get access_token for user
router.get('/', async (req, res) => {
  try {
    const { access_token } = await instagram.authorizeUser(req.query.code, redirectUri);

    const accountInfo = await fetchInstagramAccount({ access_token });
    // TODO: store this in mongo
    // res.json(accountInfo);
  } catch (err) {
    console.log(err);
  }

  // redirect them back to the app
  res.redirect('http://localhost:8080/');
});

const fetchInstagramAccount = async ({ access_token }) => {
  // Fetch the userId tied to the access_token so we can grab user data
  const accountInfo = await fetchAccountData({
    access_token,
    fields: ['id']
  });

//   // Fetch user media
//   const mediaData = await fetchProfileMedia({
//     ...accountInfo,
//     access_token,
//     fields: ['id', 'media_type', 'permalink', 'caption', 'media_url', 'timestamp'],
//   });
//   return { ...accountInfo, media: mediaData };
// };
// Fetch user media
const mediaData = await fetchProfileMedia({
  ...accountInfo,
  access_token,
  fields: ['username', 'caption'],
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
  //console.log(id);
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

module.exports = router;
