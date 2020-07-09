"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      models.Project.hasMany(models.Estimated_feature, {
        foreignKey: "project_id",
        onDelete: "CASCADE",
      });
      models.Project.belongsTo(models.Estimated_scope, {
        foreignKey: {
          name: "estimated_scope_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Project.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.ENUM(
        "in_progress",
        "dev_review",
        "accepted",
        "inactive"
      ),
      price_per_hour: DataTypes.INTEGER,
      hours_per_day: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  Project.list = () =>
    Project.findAll({ order: [["createdAt", "asc"]] }).then(ps =>
      ps.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        author_id: project.author_id,
        price_per_hour: project.price_per_hour,
        hours_per_day: project.hours_per_day,
        created_at: project.created_at,
        updated_at: project.updated_at,
      }))
    );

  Project.prototype.create = function (models) {
    return Project.create(
      {
        title: this.title,
        description: this.description,
        status: this.status,
        author_id: this.author_id,
        price_per_hour: this.price_per_hour,
        hours_per_day: this.hours_per_day,
        Estimated_scope: {
          analysis: this.analysis,
          infrastructure: this.infrastructure,
          design: this.design,
          qa: this.qa,
          management: this.management,
          release: this.release,
          support: this.support,
        },
        Estimated_features: [],
      },
      {
        include: [models.Estimated_scope, models.Estimated_feature],
      }
    ).then(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      author_id: p.author_id,
      price_per_hour: p.price_per_hour,
      hours_per_day: p.hours_per_day,
      estimated_scope_id: p.estimated_scope_id,
    }));
  };

  const findByPk = id =>
    Project.findByPk(id).then(p => {
      if (p === null) {
        const error = new Error("Project by this id is not found");
        error.statusCode = 404;
        throw error;
      }
      return p;
    });

  Project.read = async id => {
    const p = await findByPk(id);
    const estimated_scope = await p.getEstimated_scope();
    const estimated_features = await p.getEstimated_features();

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      author_id: p.author_id,
      price_per_hour: p.price_per_hour,
      hours_per_day: p.hours_per_day,
      created_at: p.createdAt,
      updated_at: p.updatedAt,
      estimated_scope_id: p.estimated_scope_id,
      estimated_scope: {
        analysis: estimated_scope.analysis,
        infrastructure: estimated_scope.infrastructure,
        design: estimated_scope.design,
        qa: estimated_scope.qa,
        management: estimated_scope.management,
        release: estimated_scope.release,
        support: estimated_scope.support,
      },
      estimated_features,
    };
  };

  Project.delete = (id, models) =>
    findByPk(id).then(p =>
      p.destroy({
        where: { id },
        cascade: true,
        include: [
          {
            model: models.Estimated_scope,
            cascade: true,
          },
        ],
      })
    );
  return Project;
};
