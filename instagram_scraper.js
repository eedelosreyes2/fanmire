const Instagram = require("node-instagram").default;
const express = require('express');

// Create a new instance.
const instagram = new Instagram({
  clientId: '661075011129053',
  clientSecret: '7a90a365f58bc4b8b07fc0b568471c9f',
});

const redirectUri = 'https://github.com/rachelhj';

// create express server
const app = express();

// Redirect user to instagram oauth
app.get('/auth/instagram', (req, res) => {
  res.redirect(instagram.getAuthorizationUrl(redirectUri, { scope: ["user_profile"] }));
});

// Handle auth code and get access_token for user
app.get('/auth/instagram/callback', async (req, res) => {
  try {
    const data = await instagram.authorizeUser(req.query.code, redirectUri);
    // access_token in data.access_token
    res.json(data);
    console.log(data.access_token);
  } catch (err) {
    res.json(err);
  }
});

// listen to port 3000
app.listen(3000, () => {
  console.log('app listening on http://localhost:3000');
});
