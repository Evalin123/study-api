const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  identity : {
    type : String,
    required : true
  },
  createDate : {
    type : Date,
    default : Date.now
  },
});

UserSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = User = mongoose.model('users',UserSchema);