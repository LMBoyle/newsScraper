var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DateSchema = new Schema({
  savedDate: {
    type: String,
  }
});

var DateModel = mongoose.model("Date", DateSchema);

module.exports = DateModel;
