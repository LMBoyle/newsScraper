var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  isSaved: {
    type: Boolean,
    default: false
  },
});

var ArticleModel = mongoose.model("Article", ArticleSchema);

module.exports = ArticleModel;