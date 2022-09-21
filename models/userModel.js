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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
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

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(this.ChangedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
