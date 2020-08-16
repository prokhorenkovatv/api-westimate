"use strict";

import { Sequelize, DataTypes, Model } from "sequelize";

export default (sequelize: Sequelize) => {
  class User_Team extends Model {
    public team_id!: number;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  User_Team.init(
    {
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User_Team",
    }
  );
  return User_Team;
};
