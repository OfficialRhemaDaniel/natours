const express = require('express');

const getAllUsers = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

const getUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

const createUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

const updateUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

const deleteUser = (req, res) => {
  res.status('500').json({
    status: 'error',
    message: 'the route never too gel',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
