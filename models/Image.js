const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  userId : {
    type : String,
    required : true
  },
  imagePath : {
    type : String,
    required : true
  },
});

module.exports = Image = mongoose.model('images',ImageSchema);