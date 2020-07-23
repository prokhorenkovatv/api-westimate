import express from "express";
import { getFeatures } from "controllers/estimated_feature";
import { authMiddleware } from "../middleware/isAuth";

const router = express.Router();

router.get("/", authMiddleware, getFeatures);

export default router;
