"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader)
        return next(new errorResponse_1.default("Token was not provided", 401));
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken.type !== "access") {
            return next(new errorResponse_1.default("Invalid token", 401));
        }
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError)
            return next(new errorResponse_1.default("Token expired!", 401));
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError)
            return next(new errorResponse_1.default("Invalid token", 401));
        return next(new errorResponse_1.default(e, 500));
    }
    if (!decodedToken)
        return next(new errorResponse_1.default("Not authenticated", 401));
    next();
};
