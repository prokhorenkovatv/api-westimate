"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_feature_1 = require("controllers/default_feature");
const isAuth_1 = require("../middleware/isAuth");
const validator_1 = require("middleware/validator");
const router = express_1.default.Router();
router.get("/", isAuth_1.authMiddleware, default_feature_1.getFeatures);
router.post("/", isAuth_1.authMiddleware, validator_1.featureValidationRules(), validator_1.validate, default_feature_1.postFeature);
router.get("/:id", isAuth_1.authMiddleware, default_feature_1.getFeature);
router.patch("/:id", isAuth_1.authMiddleware, validator_1.featureValidationRules(), validator_1.validate, default_feature_1.patchFeature);
router.delete("/:id", isAuth_1.authMiddleware, default_feature_1.deleteFeature);
exports.default = router;
