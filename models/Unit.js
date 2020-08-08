const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  userId : {
    type : String,
    required : true
  },
  subject : {
    type : String,
    required : true
  },
  title : {
    type : String,
    required : true
  },
  subtitle : {
    type : String,
    required : true
  },
  content : {
    type : String,
    required : true
  },
  createDate : {
    type : Date,
    default : Date.now
  },
});

module.exports = Unit = mongoose.model('units',UnitSchema);