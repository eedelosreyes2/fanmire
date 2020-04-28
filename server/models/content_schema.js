const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  user_name: String,
  user_handle: String,
  user_image: String,
  content_type: String,
  content_text: String,
  likes: Number,
  date_created: Date
});

// class SchemaConverter {
//   async convert_tweets(twitter_json) {
//     var tweets = [];
//
//     var i;
//     for (i = 0; i < 1; i++) {
//       var tweet = twitter_json[i];
//       console.log(tweet.user.name);
//       console.log(tweet.text);
//     }
//   }
// }

let Content = module.exports = mongoose.model('Content', contentSchema);