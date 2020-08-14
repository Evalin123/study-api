const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const keys = require('./config/keys');
const users = require('./routes/api/users');
const subjects = require('./routes/api/subjects');
const units = require('./routes/api/units');
const quizzes = require('./routes/api/quizzes');
const images = require('./routes/api/images');

const app = express();
const port = 5000;

app.use(cors());
mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true
})
  .then(() => {
    console.log(`mongoose connect db`)
  })
  .catch((error) => {
    console.log(error)
  })

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./config/passport')(passport);

app.get('/', (request, response) => {
  response.send('Welcome');
});

app.use('/uploads',express.static('uploads'));
app.use('/study/users', users);
app.use('/study/subjects', subjects);
app.use('/study/units', units);
app.use('/study/quizzes', quizzes);
app.use('/study/images', images);
