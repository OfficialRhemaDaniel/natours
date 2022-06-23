const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEEPTION! ✨ shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DATABASE CONNECTED!!')).catch(err => console.log('ERROR🤔'));

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`App is running at ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! ✨ shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
});

