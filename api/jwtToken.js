const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_KEY;
const tokenLife = process.env.JWT_LIFE;
const generateToken = user => new Promise((resolve, reject) => {
  const userData = {
    name: user.name,
    email: user.email,
  };
  jwt.sign(
    { data: userData },
    secretKey,
    {
      algorithm: 'HS256',
      expiresIn: tokenLife,
    },
    (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    },
  );
});

const verifyToken = (token, secretKey) => new Promise((resolve, reject) => {
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return reject(error);
    }
    resolve(decoded);
  });
});

module.exports = {
  generateToken,
  verifyToken,
};
