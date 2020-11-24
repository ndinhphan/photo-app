const express = require('express');
const bodyParser = require("body-parser");
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const user = require('./user.js');

require('dotenv').config();

const port = process.env.API_SERVER_PORT || 3000;

const app = express();
installHandler(app);

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR', err);
  }
}());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post('/register', async (req, res) => {
//   console.log('OK');
//   await user.create('',{
//     firstname: 'tfytytfyfty',
//     lastname: 'req.body.lastname',
//     email: 'req.body.email',
//     password: 'req.body.password'
//   });
//   console.log('after');
//   // TODO: add user to database and send back an auth token

//   // res.redirect('http://localhost:8000/home');
// });

module.exports = app;