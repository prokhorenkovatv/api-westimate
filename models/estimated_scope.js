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
      infrastructure: DataTypes.FLOAT,
      design: DataTypes.FLOAT,
      qa: DataTypes.FLOAT,
      management: DataTypes.FLOAT,
      release: DataTypes.FLOAT,
      support: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Estimated_scope",
    }
  );
  return Estimated_scope;
};
