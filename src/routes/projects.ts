import express from "express";
import {
  getProjects,
  getProject,
  postProject,
  postDuplicateProject,
  postPdfProject,
  patchProject,
  deleteProject,
} from "controllers/projects";
import {
  postProjectFeature,
  patchProjectFeature,
  deleteProjectFeature,
} from "controllers/estimated_feature";
import { authMiddleware } from "middleware/isAuth";
import {
  projectValidationRules,
  validate,
  featureValidationRules,
} from "../middleware/validator";

const router = express.Router();

router.get("/", authMiddleware, getProjects);

router.post("/", authMiddleware, postProject);

router.post("/:id/duplicate", authMiddleware, postDuplicateProject);

router.get("/:id", authMiddleware, getProject);

router.patch("/:id", patchProject);

router.delete("/:id", authMiddleware, deleteProject);

router.post(
  "/:id/estimated_features",
  // authMiddleware,
  // featureValidationRules(),
  // validate,
  postProjectFeature
);

router.patch(
  "/:id/estimated_features/:featureId",
  // authMiddleware,
  // featureValidationRules(),
  // validate,
  patchProjectFeature
);

router.delete(
  "/:id/estimated_features/:featureId",
  authMiddleware,
  deleteProjectFeature
);

router.post("/create-pdf", authMiddleware, postPdfProject);

export default router;
