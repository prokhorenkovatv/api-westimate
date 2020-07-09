const express = require("express");
const { body } = require("express-validator");
const defaultFeatureController = require("../controllers/default_feature");
const router = express.Router();
const authMiddleware = require("../middleware/isAuth");

router.get("/", authMiddleware, defaultFeatureController.getFeatures);
router.post(
  "/",
  [
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ min: 3 }),
  ],
  defaultFeatureController.postFeature
);

router.get("/:id", authMiddleware, defaultFeatureController.getFeature);

router.put("/:id", authMiddleware, defaultFeatureController.putFeature);

router.delete("/:id", authMiddleware, defaultFeatureController.deleteFeature);

module.exports = router;
