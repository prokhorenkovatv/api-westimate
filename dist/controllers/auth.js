"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("models"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const authHelper_1 = require("utils/authHelper");
const updateTokens = (user_id) => {
    const accessToken = authHelper_1.generateAccessToken(user_id);
    const refreshToken = authHelper_1.generateRefreshToken();
    return authHelper_1.updateDbRefreshToken(refreshToken.id, user_id).then(() => ({
        accessToken,
        refreshToken: refreshToken.token,
    }));
};
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await models_1.default.User.findOne({
        where: { email },
    });
    try {
        if (!user) {
            return next(new errorResponse_1.default(`User with email - ${email} does not exist`, 401));
        }
        const isValid = bcrypt_1.default.compareSync(password, user.password);
        if (isValid)
            return updateTokens(user.id).then(tokens => res.status(200).json({
                id: user.id,
                username: user.first_name,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            }));
        return next(new errorResponse_1.default("Invalid credentials", 401));
    }
    catch (e) {
        next(new errorResponse_1.default(e, 500));
    }
};
exports.signIn = signIn;
const refreshTokens = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        let payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (payload.type !== "refresh")
            return next(new errorResponse_1.default("Invalid token", 400));
        const token = await models_1.default.Token.findOne({
            where: { token_id: payload.id },
        });
        if (token === null)
            return next(new errorResponse_1.default("Invalid token", 400));
        const newTokens = await updateTokens(token.user_id);
        if (!newTokens)
            return next(new errorResponse_1.default("Invalid token", 400));
        return res.status(200).json({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
        });
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            next(new errorResponse_1.default("Token expired", 400));
        }
        else if (e instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            next(new errorResponse_1.default("Invalid token", 400));
        }
        return next(new errorResponse_1.default(e, 500));
    }
};
exports.refreshTokens = refreshTokens;
