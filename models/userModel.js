const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//name, email, photo, password, confirmPassword
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is very much required...'],
  },

  email: {
    type: String,
    required: [true, 'e-mail is always required.'],
    unique: [true, 'must be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email try again'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'There has to be a password'],
    minLength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not thesame',
    },
  },

  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userschema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp);
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
