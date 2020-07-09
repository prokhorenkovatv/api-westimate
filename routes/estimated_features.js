const express = require("express");
const estimatedFeatureController = require("../controllers/estimated_feature");
const router = express.Router();
const authMiddleware = require("../middleware/isAuth");

router.get("/", authMiddleware, estimatedFeatureController.getFeatures);

module.exports = router;
