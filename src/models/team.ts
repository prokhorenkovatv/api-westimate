"use strict";

import { Sequelize, DataTypes, Model } from "sequelize";

export default (sequelize: Sequelize) => {
  class Team extends Model {
    public id!: number;
    public team_name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  Team.init(
    {
      team_name: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};
