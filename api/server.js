const express = require('express');
const { connectToDb } = require('./db_mysql.js');
const { installHandler } = require('./api_handler.js');
require('dotenv').config();
const login = require('./login');
const register = require('./register');

const bodyParser = require('body-parser');

const port = process.env.API_SERVER_PORT || 3000;

const app = express();
installHandler(app);

app.use('/api/login', login.route);
app.use('/api/register', register.route);

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
