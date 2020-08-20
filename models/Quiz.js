const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  subjectId : {
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
  choiceA : {
    type : String,
    required : true
  },
  choiceB : {
    type : String,
    required : true
  },
  choiceC : {
    type : String,
  },
  choiceD : {
    type : String,
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