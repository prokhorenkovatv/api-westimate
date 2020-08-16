"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserTeam = exports.postUserTeam = exports.getUsersTeams = void 0;
const models_1 = __importDefault(require("models"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const async_1 = require("middleware/async");
const getUsersTeams = async_1.asyncHandler(async (req, res, next) => {
    const users = await models_1.default.User.listWithTeams(models_1.default);
    if (!users)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(users);
});
exports.getUsersTeams = getUsersTeams;
const postUserTeam = async_1.asyncHandler(async (req, res, next) => {
    const { id, teamId } = req.params;
    const user_team = await models_1.default.User_Team.create({
        team_id: +teamId,
        user_id: +id,
    });
    if (!user_team)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(user_team);
});
exports.postUserTeam = postUserTeam;
const deleteUserTeam = async_1.asyncHandler(async (req, res, next) => {
    const { id, teamId } = req.params;
    const result = await models_1.default.User_Team.destroy({
        where: { user_id: id, team_id: teamId },
    });
    if (!result)
        return next(new errorResponse_1.default("Server error", 500));
    res
        .status(200)
        .json({
        message: `User by id ${id} was successfully deleted from team ${teamId}`,
    });
});
exports.deleteUserTeam = deleteUserTeam;
