const express = require('express');
const { connectToDb } = require('./db_mysql.js');
const { installHandler } = require('./api_handler.js');
require('dotenv').config();
const bodyParser = require('body-parser');
const AuthMiddleWare = require('./AuthMiddleware');
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');

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

app.use(bodyParser.json());
// app.use(AuthMiddleWare.isAuth);

app.post('/api/login', loginController.login);
app.post('/api/register', registerController.register);