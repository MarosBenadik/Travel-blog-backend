const jwt = require("jsonwebtoken");
const config = process.env;



const verifyToken = (req, res, next) => {
  const token =
    req.headers['authorization'];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
      const access_token = token.split(" ")[1];
    const decoded = jwt.verify(access_token, process.env.JWT_SEC);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;