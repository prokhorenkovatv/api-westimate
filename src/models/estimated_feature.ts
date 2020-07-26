"use strict";
import {
  Sequelize,
  Model,
  DataTypes,
  InstanceUpdateOptions,
  FindOptions,
  InstanceDestroyOptions,
} from "sequelize";
import { EstimatedFeatureAttributes } from "./types";
import { ErrorHandler } from "middleware/error";

export default (sequelize: Sequelize) => {
  class Estimated_feature extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public frontend_days!: number;
    public backend_days!: number;
    public project_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static list: (
      project_id: number
    ) => Promise<EstimatedFeatureAttributes[]>;
    public static delete: (id: number) => Promise<Estimated_feature | void>;
    public static read: (id: number) => Promise<EstimatedFeatureAttributes>;
    public static updateEf: (
      id: number,
      updateFields: InstanceUpdateOptions
    ) => Promise<Estimated_feature>;
    public create!: () => Promise<EstimatedFeatureAttributes>;
  }
  Estimated_feature.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      frontend_days: DataTypes.INTEGER,
      backend_days: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Estimated_feature",
    }
  );
  Estimated_feature.list = (
    project_id: number
  ): Promise<EstimatedFeatureAttributes[]> =>
    Estimated_feature.findAll({
      order: [["createdAt", "asc"]],
      where: project_id ? { project_id: project_id } : null,
    } as FindOptions).then(ef =>
      ef.map(feature => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        frontend_days: feature.frontend_days,
        backend_days: feature.backend_days,
        project_id: feature.project_id,
        created_at: feature.createdAt,
        updated_at: feature.updatedAt,
      }))
    );

  Estimated_feature.prototype.create = async function () {
    const ef = await Estimated_feature.create({
      title: this.title,
      description: this.description,
      frontend_days: this.frontend_days,
      backend_days: this.backend_days,
      project_id: this.project_id,
    });
    return ef;
  };

  const findFeatureByPk = (id: number) =>
    Estimated_feature.findByPk(id).then(ef => {
      if (ef === null) {
        const error: ErrorHandler = new Error(
          "Estimated feature by this id is not found"
        );
        error.statusCode = 404;
        throw error;
      }
      return ef;
    });

  Estimated_feature.updateEf = (
    id: number,
    updateFields: InstanceUpdateOptions<EstimatedFeatureAttributes>
  ) => findFeatureByPk(id).then(ef => ef.update(updateFields));

  Estimated_feature.delete = (id: number): Promise<any> =>
    findFeatureByPk(id).then(ef =>
      ef.destroy({ where: { id } } as InstanceDestroyOptions)
    );

  Estimated_feature.read = async function (id: number) {
    const ef = await findFeatureByPk(id);
    return ef;
  };

  return Estimated_feature;
};
