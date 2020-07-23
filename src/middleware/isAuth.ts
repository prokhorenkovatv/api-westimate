import jwt, { Secret } from "jsonwebtoken";
import ErrorResponse from "utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { DecodedToken } from "utils/authHelper";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return next(new ErrorResponse("Token was not provided", 401));

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as DecodedToken;
    if ((decodedToken as DecodedToken).type !== "access") {
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
