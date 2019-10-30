var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedSchema = new Schema({
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
    default: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var SavedModel = mongoose.model("Saved", SavedSchema);

module.exports = SavedModel;