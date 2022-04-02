const app = require('./app');

//port

const port = 3000;
app.listen(port, () => {
  console.log(`App is running at ${port}...`);
});
