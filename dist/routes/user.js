"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("controllers/user");
const isAuth_1 = require("../middleware/isAuth");
const router = express_1.default.Router();
// router.get("/", authMiddleware, getUsers);
router.get("/teams", isAuth_1.authMiddleware, user_1.getUsersTeams);
router.post("/:id/teams/:teamId", isAuth_1.authMiddleware, user_1.postUserTeam);
router.delete("/:id/teams/:teamId", isAuth_1.authMiddleware, user_1.deleteUserTeam);
// router.patch(
//   "/:id",
//   authMiddleware,
//   patchFeature
// );
// router.delete("/:id", authMiddleware, deleteFeature);
exports.default = router;
