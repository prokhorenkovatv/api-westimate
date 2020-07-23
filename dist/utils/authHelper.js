"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDbRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("models"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const uuid_1 = require("uuid");
const generateAccessToken = (user_id) => {
    const payload = {
        id: user_id,
        type: "access",
    };
    const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = () => {
    const payload = {
        id: uuid_1.v4(),
        type: "refresh",
    };
    const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES };
    return {
        id: payload.id,
        token: jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, options),
    };
};
exports.generateRefreshToken = generateRefreshToken;
const updateDbRefreshToken = async (token_id, user_id) => {
    try {
        const [token, created] = await models_1.default.Token.findOrCreate({
            defaults: { token_id },
            where: { user_id },
        });
        if (!created)
            return await token.update({
                token_id,
                where: { user_id },
            });
        return token;
    }
    catch (e) {
        return new errorResponse_1.default("Could not refresh token", 500);
    }
};
exports.updateDbRefreshToken = updateDbRefreshToken;
