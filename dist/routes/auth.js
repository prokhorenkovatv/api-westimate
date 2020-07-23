"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("controllers/auth");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signin", auth_1.signIn);
router.post("/refresh_tokens", auth_1.refreshTokens);
exports.default = router;
