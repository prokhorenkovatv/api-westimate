import jwt, { Secret } from "jsonwebtoken";
import models from "models";
import ErrorResponse from "utils/errorResponse";
import { v4 as uuidv4 } from "uuid";
import { FindOrCreateOptions, UpdateOptions } from "sequelize/types";

export interface DecodedToken {
  id: string;
  type: string;
}
const generateAccessToken = (user_id: number) => {
  const payload = {
    id: user_id,
    type: "access",
  };
  const options = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as Secret, options);
};

const generateRefreshToken = (): { id: string; token: string } => {
  const payload: DecodedToken = {
    id: uuidv4(),
    type: "refresh",
  };
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES };

  return {
    id: payload.id,
    token: jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      options
    ),
  };
};

const updateDbRefreshToken = async (
  token_id: string,
  user_id: number
): Promise<string | ErrorResponse | Promise<any>> => {
  try {
    const [token, created] = await models.Token.findOrCreate({
      defaults: { token_id },
      where: { user_id },
    } as FindOrCreateOptions);
    if (!created)
      return await token.update({
        token_id,
        where: { user_id },
      } as UpdateOptions);
    return token;
  } catch (e) {
    return new ErrorResponse("Could not refresh token", 500);
  }
};
export { generateAccessToken, generateRefreshToken, updateDbRefreshToken };
