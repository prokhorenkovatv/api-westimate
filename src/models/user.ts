"use strict";

import { Sequelize, Model, DataTypes } from "sequelize";
import { AllModels, UserAttributes } from "./types";
export default (sequelize: Sequelize) => {
  class User extends Model {
    public static associate(models: AllModels) {
      models.User.hasMany(models.Project, {
        foreignKey: "author_id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone: DataTypes.STRING,
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
