const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return next(new ErrorResponse("Token was not provided", 401));

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.type !== "access") {
      return next(new ErrorResponse("Invalid token", 401));
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError)
      return next(new ErrorResponse("Token expired!", 401));
    if (e instanceof jwt.JsonWebTokenError)
      return next(new ErrorResponse("Invalid token", 401));
    return next(new ErrorResponse(e, 500));
  }

  if (!decodedToken) return next(new ErrorResponse("Not authenticated", 401));
  next();
};
