const mongoose = require('mongoose');
// const validator = require('validator');
// console.log(validator)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    // validate: { validator(v) { return validator.isLength(v); },
    // message: 'Длина не соответствует ограничениям' },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
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
