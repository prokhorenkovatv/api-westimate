const express = require("express");
const projectController = require("../controllers/projects");
const estimatedFeatureController = require("../controllers/estimated_feature");
const router = express.Router();
const authMiddleware = require("../middleware/isAuth");
const {
  projectValidationRules,
  validate,
  featureValidationRules,
} = require("../middleware/validator");

router.get("/", authMiddleware, projectController.getProjects);

router.post("/", authMiddleware, projectController.postProject);

router.post(
  "/:id/duplicate",
  authMiddleware,
  projectController.postDuplicateProject
);

router.get("/:id", authMiddleware, projectController.getProject);

router.patch("/:id", projectController.patchProject);

router.delete("/:id", authMiddleware, projectController.deleteProject);

router.post(
  "/:id/estimated_features",
  // authMiddleware,
  // featureValidationRules(),
  // validate,
  estimatedFeatureController.postProjectFeature
);

router.patch(
  "/:id/estimated_features/:featureId",
  // authMiddleware,
  // featureValidationRules(),
  // validate,
  estimatedFeatureController.patchProjectFeature
);

router.delete(
  "/:id/estimated_features/:featureId",
  authMiddleware,
  estimatedFeatureController.deleteProjectFeature
);

router.post("/create-pdf", authMiddleware, projectController.postPdfProject);

module.exports = router;
