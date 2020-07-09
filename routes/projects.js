const express = require("express");
const { body } = require("express-validator");
const projectController = require("../controllers/projects");
const estimatedFeatureController = require("../controllers/estimated_feature");
const router = express.Router();
const authMiddleware = require("../middleware/isAuth");

router.get("/", projectController.getProjects);

router.post(
  "/",
  [
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ min: 3 }),
  ],
  projectController.postProject
);

router.get("/:id", projectController.getProject);

router.put("/:id", authMiddleware, projectController.putProject);

router.delete("/:id", authMiddleware, projectController.deleteProject);

router.post(
  "/:id/estimated_features",
  authMiddleware,
  estimatedFeatureController.postProjectFeature
);

router.put(
  "/:id/estimated_features/:featureId",
  authMiddleware,
  estimatedFeatureController.putProjectFeature
);

router.delete(
  "/:id/estimated_features/:featureId",
  authMiddleware,
  estimatedFeatureController.deleteProjectFeature
);

router.post("/create-pdf", authMiddleware, projectController.postPdfProject);

module.exports = router;
