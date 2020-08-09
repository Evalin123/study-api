const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
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
  question : {
    type : String,
    required : true
  },
  answer : {
    type : String,
    required : true
  },
  createDate : {
    type : Date,
    default : Date.now
  },
});

module.exports = Quiz = mongoose.model('quizzes',QuizSchema);