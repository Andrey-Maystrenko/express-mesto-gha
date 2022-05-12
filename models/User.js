const mongoose = require('mongoose');
// const validator = require('validator');
// console.log(validator)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenth: 2,
    maxlength: 30,
    // validate: (v) => validator.isEmail(v),
  },
  about: {
    type: String,
    required: true,
    minlenth: 2,
    maxlength: 30,
    // validate: (v) => validator.isLength(v),
  },
  avatar: {
    type: String,
    required: true,
    // validate: () => validator.contains('http://'),
  },
});

module.exports = mongoose.model('user', userSchema);
