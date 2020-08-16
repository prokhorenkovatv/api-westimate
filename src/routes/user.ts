import express from "express";
import { getUsersTeams, postUserTeam, deleteUserTeam } from "controllers/user";
import { authMiddleware } from "../middleware/isAuth";

const router = express.Router();
// router.get("/", authMiddleware, getUsers);

router.get("/teams", authMiddleware, getUsersTeams);
router.post("/:id/teams/:teamId", authMiddleware, postUserTeam);
router.delete("/:id/teams/:teamId", authMiddleware, deleteUserTeam);

// router.patch(
//   "/:id",
//   authMiddleware,
//   patchFeature
// );

// router.delete("/:id", authMiddleware, deleteFeature);

export default router;
