const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

console.log(DB);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Script Connected To Database');
  });
//READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
//IMPORTING DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded!!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted sucessfully!!!');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
