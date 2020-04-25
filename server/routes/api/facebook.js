const request = require('request-promise');

app.get('/login/facebook',
  passport.authenticate('facebook', {
    scope: ['publish_actions', 'manage_pages']
  }
));

const payload = {
  queryTerm: 'Fanmire',
  searchType: 'page'
}

const request = require('request-promise');

module.exports = (app) => {

  // you'll need to have requested 'user_about_me' permissions
  // in order to get 'quotes' and 'about' fields from search
  const userFieldSet = 'name, link, is_verified, picture';
  const pageFieldSet = 'name, category, link, picture, is_verified';


  app.post('/facebook-search', (req, res) => {
    const  { queryTerm, searchType } = req.body;

    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/search',
      qs: {
        access_token: config.user_access_token,
        q: queryTerm,
        type: searchType,
        fields: searchType === 'page' ? pageFieldSet : userFieldSet
      }
    };

    request(options)
      .then(fbRes => {
// Search results are in the data property of the response.
// There is another property that allows for pagination of results.
// Pagination will not be covered in this post,
// so we only need the data property of the parsed response.
        const parsedRes = JSON.parse(fbRes).data;
        res.json(parsedRes);
      })
  });
}

app.get('/facebook-search/:id', (req, res) => {

  // you need permission for most of these fields
  const userFieldSet = 'id, name, about, email, link, is_verified, website, picture, photos, feed';

  const options = {
    method: 'GET',
    uri: `https://graph.facebook.com/v6.0/${req.params.id}`,
    qs: {
      access_token: user_access_token,
      fields: userFieldSet
    }
  };
  request(options)
    .then(fbRes => {
      res.json(fbRes);
    })
})

const getMediaOptions = {
  method: 'GET',
  uri: `https://graph.facebook.com/v6.0/${user.facebook_id}`,
  qs: {
    access_token: user.access_token,
    type: 'user',
    fields: 'photos.limit(2).order(reverse_chronological){link, comments.limit(2).order(reverse_chronological)}'
  }
};

const options = {
// let's assume id below is 1458722400807259,
// which is my user id
  method: 'GET',
  uri: `https://graph.facebook.com/v6.0/${req.params.id}/accounts`,
  qs: {
      access_token: user_access_token
  }
};
request(options)
  .then(fbRes => {
    res.json(fbRes);
  })
