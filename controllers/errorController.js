const AppError = require('./../utils/appError');

const handleJWTExpiredError = () =>
  new AppError('your token has expired. Please log in again', 401);

const handleJWTError = () =>
  new AppError('Invalid token please log in again', 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const { name } = err.keyValue;

  const message = `Duplicate field value: ${name}. Please use another field value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log(err);
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid Input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR✨', err);
    res.status(500).json({
      status: 'error',
      message: 'oops! something went wrong somewhere',
    });
  }
};
module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV.trim() === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message && error._message === 'Validation failed')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
