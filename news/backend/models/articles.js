const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  publishedAt: Date,
  url: String,
  urlToImage: String,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;