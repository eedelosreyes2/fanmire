const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: String,
  user_handle: String,
  user_image: String,
  content_type: String,
  content_text: String,
  likes: Number,
  created_date: Date
});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;