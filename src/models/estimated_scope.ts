"use strict";
import { Sequelize, Model, DataTypes } from "sequelize";
import {
  EstimatedScopeAttributes,
  EstimatedScopeCreationAttributes,
  AllModels,
} from "./types";

export default (sequelize: Sequelize) => {
  class Estimated_scope extends Model {
    public id!: number;
    public analysis!: number;
    public isAnalysisActive!: boolean;
    public infrastructure!: number;
    public isInfrastructureActive!: boolean;
    public design!: number;
    public isDesignActive!: boolean;
    public qa!: number;
    public isQaActive!: boolean;
    public management!: number;
    public isManagementActive!: boolean;
    public release!: number;
    public isReleaseActive!: boolean;
    public support!: number;
    public isSupportActive!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // static associate(models: AllModels): void {
    //   models.Estimated_scope.hasOne(models.Project, {
    //     foreignKey: "estimated_scope_id",
    //   });
    // }
  }
  Estimated_scope.init(
    {
      analysis: DataTypes.FLOAT,
      isAnalysisActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      infrastructure: DataTypes.FLOAT,
      isInfrastructureActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      design: DataTypes.FLOAT,
      isDesignActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      qa: DataTypes.FLOAT,
      isQaActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      management: DataTypes.FLOAT,
      isManagementActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      release: DataTypes.FLOAT,
      isReleaseActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      support: DataTypes.FLOAT,
      isSupportActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Estimated_scope",
    }
  );
  return Estimated_scope;
};
