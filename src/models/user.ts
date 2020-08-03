"use strict";

import { Sequelize, Model, DataTypes } from "sequelize";
export default (sequelize: Sequelize) => {
  class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public phone!: string;
    public email!: string;
    public password!: string;
    public gender!: number;
    public onboarding_at!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public static associate(models: AllModels) {
    //   models.User.hasMany(models.Project, {
    //     foreignKey: "author_id",
    //     onDelete: "CASCADE",
    //   });
    // }
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
