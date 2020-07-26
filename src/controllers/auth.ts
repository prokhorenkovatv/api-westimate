import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import models from "models";
import ErrorResponse from "utils/errorResponse";
import {
  generateAccessToken,
  generateRefreshToken,
  updateDbRefreshToken,
  DecodedToken,
} from "utils/authHelper";
import { Request, Response, NextFunction } from "express";

const updateTokens = (user_id: number) => {
  const accessToken = generateAccessToken(user_id);
  const refreshToken = generateRefreshToken();

  return updateDbRefreshToken(refreshToken.id, user_id).then(() => ({
    accessToken,
    refreshToken: refreshToken.token,
  }));
};

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await models.User.findOne({
    where: { email },
  });
  try {
    if (!user) {
      return next(
        new ErrorResponse(`User with email - ${email} does not exist`, 401)
      );
    }

    const isValid = bcrypt.compareSync(password, user.password);
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
  } catch (e) {
    next(new ErrorResponse(e, 500));
  }
};

const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    let payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as DecodedToken;

    if (payload.type !== "refresh")
      return next(new ErrorResponse("Invalid token", 400));

    const token = await models.Token.findOne({
      where: { token_id: payload.id },
    });
    if (token === null) return next(new ErrorResponse("Invalid token", 400));

    const newTokens = await updateTokens(token.user_id);

    if (!newTokens) return next(new ErrorResponse("Invalid token", 400));

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

export { signIn, refreshTokens };
