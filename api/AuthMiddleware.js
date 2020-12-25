const jwtToken = require('./jwtToken');
const secretKey = process.env.JWT_KEY;

let isAuth = async (req, res, next) => {
  console.log("Token: " + req.body.token);
  const tokenFromClient = req.body.token || req.query.token || req.headers["token"];

  if (tokenFromClient) {
    try {
      console.log("\ndecoding____________________________________________________________");
      const decoded = await jwtToken.verifyToken(tokenFromClient, secretKey);
      console.log("decode conpleted____________________________________________________");
      console.log("decoded data: ");
      console.log(decoded.data);
      console.log("\n\n");
      req.body.token = decoded.data;
      next();
    } catch (error) {
      return res.status(401).json({
        authorized: false,
        message: 'Unauthorized.'
      });
    }
  } else {
    return res.status(403).send({
        authorized: false,
        message: 'No token provided.'
    });
  }
}

module.exports = {
  isAuth
};