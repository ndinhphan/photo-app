const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;
const tokenLife = process.env.JWT_LIFE;
let generateToken = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    const userData = {
      id: user.id
    }
    jwt.sign(
      {data: userData},
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
    });
  });
}

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}

module.exports = {
  generateToken,
  verifyToken
};