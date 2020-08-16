"use strict";
import { UserRole, UserAttributes, AllModels } from "./types";
import { Sequelize, Model, DataTypes } from "sequelize";
export default (sequelize: Sequelize) => {
  class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public role!: UserRole;
    public phone!: string;
    public email!: string;
    public password!: string;
    public gender!: number;
    public user_teams!: Array<{ team_id: number }>;
    public onboarding_at!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static listWithTeams: (
      models: AllModels
    ) => Promise<{ id: number; username: string }[]>;
    Teams: any;
  }

  User.listWithTeams = async (models: AllModels) => {
    // const teams = await models.User_Team.getTeams()
    const users = await User.findAll({
      // attributes: ["id", "first_name", "last_name"],
      where: { role: "member" },
      include: {
        model: models.Team,
        attributes: ["team_name", "id"],
        through: { attributes: [] },
      },
    });
    console.log("List with teams", users);
    return users.map(user => ({
      id: user.id,
      username: `${user.first_name} ${user.last_name}`,
      email: user.email,
      teams: user.Teams,
    }));
  };
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("member", "admin"),
        defaultValue: "member",
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      gender: DataTypes.TINYINT,
      onboarding_at: DataTypes.DATE,
    },
    {
      sequelize: sequelize,
      modelName: "User",
    }
  );
  return User;
};
