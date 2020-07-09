"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Estimated_feature extends Model {
    // static associate(models) {
    //   models.Estimated_feature.belongsTo(models.Project, {
    //     onDelete: "CASCADE",
    //     foreignKey: {
    //       name: "project_id",
    //       allowNull: false,
    //     },
    //   });
    // }
  }
  Estimated_feature.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      frontend_days: DataTypes.INTEGER,
      backend_days: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Estimated_feature",
    }
  );
  Estimated_feature.list = project_id =>
    Estimated_feature.findAll({
      order: [["createdAt", "asc"]],
      where: project_id ? { project_id: project_id } : null,
    }).then(ef =>
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

  Estimated_feature.prototype.create = function () {
    return Estimated_feature.create({
      title: this.title,
      description: this.description,
      frontend_days: this.frontendDays,
      backend_days: this.backendDays,
      project_id: this.project_id,
    }).then(ef => ({ id: ef.id }));
  };

  const findFeatureByPk = id =>
    Estimated_feature.findByPk(id).then(ef => {
      if (ef === null) {
        const error = new Error("Estimated feature by this id is not found");
        error.statusCode = 404;
        throw error;
      }
      return ef;
    });

  Estimated_feature.update = (id, updateFields) =>
    findFeatureByPk(id).then(ef => ef.update(updateFields));

  Estimated_feature.delete = id =>
    findFeatureByPk(id).then(ef => ef.destroy({ where: { id } }));

  Estimated_feature.read = async function (id) {
    const ef = await findFeatureByPk(id);
    return ef;
  };

  return Estimated_feature;
};
