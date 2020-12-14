const jwtToken = require('./jwtToken');
const secretKey = process.env.JWT_KEY;

let isAuth = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["token"];

  if (tokenFromClient) {
    try {
      const decoded = await jwtToken.verifyToken(tokenFromClient, secretKey);
      req.jwtDecoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}

module.exports = {
  isAuth
};