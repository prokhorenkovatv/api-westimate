"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const estimated_feature_1 = require("controllers/estimated_feature");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
router.get("/", isAuth_1.authMiddleware, estimated_feature_1.getFeatures);
exports.default = router;
