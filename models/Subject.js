const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  userId : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  createDate : {
    type : Date,
    default : Date.now
  },
});

module.exports = Subject = mongoose.model('subjects',SubjectSchema);