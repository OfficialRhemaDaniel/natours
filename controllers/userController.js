const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.lenght,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

exports.createUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

exports.updateUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

exports.deleteUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};
