const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const {
  generateAccessToken,
  generateRefreshToken,
  updateDbRefreshToken,
} = require("../utils/authHelper");

const updateTokens = user_id => {
  const accessToken = generateAccessToken(user_id);
  const refreshToken = generateRefreshToken();

  return updateDbRefreshToken(refreshToken.id, user_id).then(() => ({
    accessToken,
    refreshToken: refreshToken.token,
  }));
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  models.User.findOne({ where: { email } })
    .then(async user => {
      if (!user) {
        return next(
          new ErrorResponse(`User with email - ${email} does not exist`, 401)
        );
      }

      const isValid = await bcrypt.compareSync(password, user.password);
      if (isValid)
        return updateTokens(user.id).then(tokens =>
          res.status(200).json({
            id: user.id,
            username: user.first_name,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          })
        );

      return next(new ErrorResponse("Invalid credentials", 401));
    })
    .catch(e => next(new ErrorResponse({ error: e }, 500)));
};

exports.refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    let payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (payload.type !== "refresh")
      return next(new ErrorResponse("Invalid token", 400));

    const token = await models.Token.findOne({
      where: { token_id: payload.id },
    });
    if (token === null) return next(new ErrorResponse("Invalid token", 400));

    const newTokens = await updateTokens(token.user_id);

    if (!newTokens) return next(new ErrorResponse(e.message, 400));

    return res.status(200).json({
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    });
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      next(new ErrorResponse("Token expired", 400));
    } else if (e instanceof jwt.JsonWebTokenError) {
      next(new ErrorResponse("Invalid token", 400));
    }
    return next(new ErrorResponse(e, 500));
  }
};
