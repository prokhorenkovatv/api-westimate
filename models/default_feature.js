"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Default_feature extends Model {}
  Default_feature.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      frontend_days: DataTypes.INTEGER,
      backend_days: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Default_feature",
    }
  );

  Default_feature.list = () =>
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
    }).then(df => ({ id: df.id }));
  };

  const findDefaultFeatureByPk = id =>
    Default_feature.findByPk(id).then(df => {
      if (df === null) {
        const error = new Error("Default feature by this id is not found");
        error.statusCode = 404;
        throw error;
      }
      return df;
    });

  Default_feature.read = id => findDefaultFeatureByPk(id);

  Default_feature.update = (id, updateFields) =>
    findDefaultFeatureByPk(id).then(df => df.update(updateFields));

  Default_feature.delete = id =>
    findDefaultFeatureByPk(id).then(df => df.destroy({ where: { id } }));

  return Default_feature;
};
