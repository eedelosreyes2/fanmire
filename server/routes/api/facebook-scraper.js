/* Revtrieve Environment Variables from .env */
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env')
});

const fs = require('fs');
const FB = require('FB');

FB.api(
  '/me',
  'GET',
  {"fields":"id,name,posts"},
  function(response) {
    if (response && !response.error)
    {
      fs.writeFileSync("./data/facebook.json", JSON.stringify(fields, null, 4));
    }
  }

);
