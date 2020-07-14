"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estimated_scope extends Model {
    static associate(models) {
      models.Estimated_scope.hasOne(models.Project, {
        foreignKey: "estimated_scope_id",
      });
    }
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
