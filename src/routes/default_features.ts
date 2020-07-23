import express from "express";
import {
  getFeatures,
  postFeature,
  getFeature,
  patchFeature,
  deleteFeature,
} from "controllers/default_feature";
import { authMiddleware } from "../middleware/isAuth";
import { featureValidationRules, validate } from "middleware/validator";

const router = express.Router();
router.get("/", authMiddleware, getFeatures);
router.post(
  "/",
  authMiddleware,
  featureValidationRules(),
  validate,
  postFeature
);

router.get("/:id", authMiddleware, getFeature);

router.patch(
  "/:id",
  authMiddleware,
  featureValidationRules(),
  validate,
  patchFeature
);

router.delete("/:id", authMiddleware, deleteFeature);

export default router;
