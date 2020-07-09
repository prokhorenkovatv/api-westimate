const jwt = require("jsonwebtoken");
const models = require("../models");
const ErrorResponse = require("./errorResponse");
const { v4: uuidv4 } = require("uuid");

exports.generateAccessToken = user_id => {
  const payload = {
    id: user_id,
    type: "access",
  };
  const options = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};

exports.generateRefreshToken = () => {
  const payload = {
    id: uuidv4(),
    type: "refresh",
  };
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES };

  return {
    id: payload.id,
    token: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options),
  };
};

exports.updateDbRefreshToken = async (token_id, user_id) => {
  try {
    const [token, created] = await models.Token.findOrCreate({
      defaults: { token_id },
      where: { user_id },
    });
    if (!created)
      return await token.update({ token_id }, { where: { user_id } });
    return token;
  } catch (e) {
    return new ErrorResponse("Could not refresh token", 500);
  }
};
