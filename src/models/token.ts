"use strict";

import { Sequelize, DataTypes, Model } from "sequelize";
import { TokenAttributes, AllModels } from "./types";
export default (sequelize: Sequelize) => {
  class Token extends Model {
    [x: string]: any;
    public token_id!: string;
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
