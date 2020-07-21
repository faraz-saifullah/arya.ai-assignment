const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
    Image Schema for storing images in the 
    mongodb database
*/
var ImageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    default: "none",
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
