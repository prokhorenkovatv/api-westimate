"use strict";

import { Sequelize, DataTypes, Model } from "sequelize";
import { AllModels } from "./types";
export default (sequelize: Sequelize) => {
  class Token extends Model {
    public id!: number;
    public token_id!: string;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static associate(models: AllModels) {
      models.Token.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  Token.init(
    {
      token_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
