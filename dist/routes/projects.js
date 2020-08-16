"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_1 = require("controllers/projects");
const estimated_feature_1 = require("controllers/estimated_feature");
const isAuth_1 = require("middleware/isAuth");
// import {
//   projectValidationRules,
//   validate,
//   featureValidationRules,
// } from "../middleware/validator";
const router = express_1.default.Router();
router.get("/", isAuth_1.authMiddleware, projects_1.getProjects);
router.post("/", isAuth_1.authMiddleware, projects_1.postProject);
router.post("/:id/duplicate", isAuth_1.authMiddleware, projects_1.postDuplicateProject);
router.get("/:id", isAuth_1.authMiddleware, projects_1.getProject);
router.patch("/:id", isAuth_1.authMiddleware, projects_1.patchProject);
router.delete("/:id", isAuth_1.authMiddleware, projects_1.deleteProject);
router.post("/:id/estimated_features", isAuth_1.authMiddleware, 
// featureValidationRules(),
// validate,
estimated_feature_1.postProjectFeature);
router.patch("/:id/estimated_features/:featureId", isAuth_1.authMiddleware, estimated_feature_1.patchProjectFeature);
router.delete("/:id/estimated_features/:featureId", isAuth_1.authMiddleware, estimated_feature_1.deleteProjectFeature);
router.post("/create-pdf", isAuth_1.authMiddleware, projects_1.postPdfProject);
exports.default = router;
