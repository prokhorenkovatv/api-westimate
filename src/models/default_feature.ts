"use strict";
import { Sequelize, Model, DataTypes, UpdateOptions } from "sequelize";
import {
  DefaultFeatureAttributes,
  DefaultFeatureCreationAttributes,
} from "./types";
import { ErrorHandler } from "middleware/error";

export default (sequelize: Sequelize) => {
  class Default_feature extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public frontend_days!: number;
    public backend_days!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static read: (id: number) => Promise<DefaultFeatureAttributes>;
    public static update: (
      id: number,
      updateFields: UpdateOptions
    ) => Promise<any>;
    public static delete: (id: number) => Promise<any>;
    public static list: () => Promise<DefaultFeatureAttributes[]>;
    public create!: () => Promise<DefaultFeatureAttributes>;
  }

  Default_feature.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      frontend_days: DataTypes.INTEGER,
      backend_days: DataTypes.INTEGER,
    },
    {
      sequelize: sequelize,
      modelName: "Default_feature",
    }
  );

  Default_feature.list = (): Promise<DefaultFeatureAttributes[]> =>
    Default_feature.findAll({
      order: [["createdAt", "asc"]],
    }).then(df =>
      df.map(feature => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        frontend_days: feature.frontend_days,
        backend_days: feature.backend_days,
        created_at: feature.createdAt,
        updated_at: feature.updatedAt,
      }))
    );

  Default_feature.prototype.create = function () {
    return Default_feature.create({
      title: this.title,
      description: this.description,
      frontend_days: this.frontend_days,
      backend_days: this.backend_days,
    }).then(df => ({
      id: df.id,
      title: df.title,
      description: df.description,
      frontend_days: df.frontend_days,
      backend_days: df.backend_days,
      created_at: df.createdAt,
      updated_at: df.updatedAt,
    }));
  };

  const findDefaultFeatureByPk = (id: number): Promise<any> =>
    Default_feature.findByPk(id).then(df => {
      if (df === null) {
        const error: ErrorHandler = new Error(
          "Default feature by this id is not found"
        );
        error.statusCode = 404;
        throw error;
      }
      return df;
    });

  Default_feature.read = (id: number): Promise<DefaultFeatureAttributes> =>
    findDefaultFeatureByPk(id);

  Default_feature.update = (id: number, updateFields) =>
    findDefaultFeatureByPk(id).then(df => df.update(updateFields));

  Default_feature.delete = (id: number) =>
    findDefaultFeatureByPk(id).then(df => df.destroy({ where: { id } }));

  return Default_feature;
};
