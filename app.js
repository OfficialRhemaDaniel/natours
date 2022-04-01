const express = require('express');
// const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// app.use(morgan('dev'));

//ROUTE HANDLERS

//ROUTES

//USERS

//USER ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//port
const port = 3000;
app.listen(port, () => {
  console.log(`App is running at ${port}...`);
});
