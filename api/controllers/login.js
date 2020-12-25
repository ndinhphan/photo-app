const bcrypt = require('bcryptjs');
const { getDb } = require('../db_mysql');
const jwtToken = require('../jwtToken');


const db = getDb();

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const login = (req, res) => {
  console.log(req.body);
  const { emailOrUsername, password } = req.body;
  if (EMAIL_REGEX.test(emailOrUsername)) {
    // check email exists
    db.User.findOne({
      attributes: ['id', 'password'],
      where: { email: emailOrUsername },
    })
      .then((result) => {
        verifyUser(result, password, res);
      });
  } else {
    // check username exists
    db.User.findOne({
      attributes: ['id', 'password'],
      where: { username: emailOrUsername },
    })
      .then((result) => {
        verifyUser(result, password, res);
      });
  }
};

async function verifyUser(user, inputPassword, res) {
    if (user) {
        if(bcrypt.compareSync(inputPassword, user.dataValues.password)) {
            const userData = {
                id: user.dataValues.id
            };
            const token = await jwtToken.generateToken(userData);
      return res.json({
        success: true,
        message: 'Login success!',
        token,
      });
    }
    return res.json({
      success: false,
      message: `Incorrect Password, password is ${user.dataValues.password}, got ${inputPassword}`,
    });
  }
  return res.json({
    success: false,
    message: 'Email or Username doesn\'t exist.',
  });
}
module.exports = { login };
