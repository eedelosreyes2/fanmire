const { Router } = require('express');
const axios = require('axios');

const router = new Router();

router.post('/facebook', async (req, res) => {
  const { body: { access_token } } = req;

  const URL = 'https://graph.facebook.com/v6.0/me';
  const userFieldSet = 'id, name, about, email, link, is_verified, website, picture, photos, feed';

  const options = {
    params: {
      access_token,
      fields: userFieldSet
    }
  };

  const { data } = await axios.get(URL, options)
  // TODO: store in mongo... then send status of 200?  Or send entire user profile?
  res.json(data);
});

module.exports = router;
