import models from "models";
import ErrorResponse from "utils/errorResponse";
import { asyncHandler } from "middleware/async";
import { Request, Response, NextFunction } from "express";

const getUsersTeams = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await models.User.listWithTeams(models);
    if (!users) return next(new ErrorResponse("Server error", 500));
    res.status(200).json(users);
  }
);

const postUserTeam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, teamId } = req.params;

    const user_team = await models.User_Team.create({
      team_id: +teamId,
      user_id: +id,
    });

    if (!user_team) return next(new ErrorResponse("Server error", 500));
    res.status(200).json(user_team);
  }
);

const deleteUserTeam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, teamId } = req.params;
    const result = await models.User_Team.destroy({
      where: { user_id: id, team_id: teamId },
    });
    if (!result) return next(new ErrorResponse("Server error", 500));

    res.status(200).json({
      message: `User by id ${id} was successfully deleted from team ${teamId}`,
    });
  }
);

export { getUsersTeams, postUserTeam, deleteUserTeam };
