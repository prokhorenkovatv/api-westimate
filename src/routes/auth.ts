import { refreshTokens, signIn } from "controllers/auth";
import express from "express";

const router = express.Router();

router.post("/signin", signIn);

router.post("/refresh_tokens", refreshTokens);

export default router;
