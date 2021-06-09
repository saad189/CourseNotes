const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Authorization failed, No token provided");

  try {
    const decodedPayload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};
