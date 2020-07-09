const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/signin", authController.signIn);

router.post("/refresh_tokens", authController.refreshTokens);

module.exports = router;
