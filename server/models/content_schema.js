const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  social_media: {
    type: String,
    enum: ['Twitter', 'Facebook', 'Instagram']
  },
  user_name: String,
  user_handle: String,
  user_image: String,
  content_type: String,
  content_text: String,
  content_image: String,
  likes: Number,
  retweets: Number,
  created_date: String,
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;