const express = require("express");
const defaultFeatureController = require("../controllers/default_feature");
const router = express.Router();
const authMiddleware = require("../middleware/isAuth");
const { featureValidationRules, validate } = require("../middleware/validator");

router.get("/", authMiddleware, defaultFeatureController.getFeatures);
router.post(
  "/",
  authMiddleware,
  featureValidationRules(),
  validate,
  defaultFeatureController.postFeature
);

router.get("/:id", authMiddleware, defaultFeatureController.getFeature);

router.patch(
  "/:id",
  authMiddleware,
  featureValidationRules(),
  validate,
  defaultFeatureController.patchFeature
);

router.delete("/:id", authMiddleware, defaultFeatureController.deleteFeature);

module.exports = router;
