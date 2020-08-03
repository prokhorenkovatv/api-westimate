"use strict";

import {
  Model,
  DataTypes,
  Sequelize,
  InstanceDestroyOptions,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";
import {
  ProjectAttributes,
  Status,
  AllModels,
  Estimated_scopeModel,
  Estimated_featureModel,
  EstimatedScopeAttributes,
  EstimatedFeatureAttributes,
} from "./types";
import { ErrorHandler } from "middleware/error";
import { calculateTotals } from "utils/calculateTotals";
import { ProjectType, ProjectExtendedType } from "types";

export default (sequelize: Sequelize) => {
  class Project extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: Status;
    public author_id!: number;
    public price_per_hour!: number;
    public hours_per_day!: number;
    public estimated_scope_id!: number;
    public estimated_scope!: EstimatedScopeAttributes;
    public estimated_features!: EstimatedFeatureAttributes[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    //magic
    public createEstimated_scope!: BelongsToCreateAssociationMixin<
      Estimated_scopeModel
    >;
    public getEstimated_scope!: BelongsToGetAssociationMixin<
      Estimated_scopeModel
    >;
    public getEstimated_features!: HasManyGetAssociationsMixin<
      Estimated_featureModel
    >;
    //custom
    public static list: () => Promise<ProjectAttributes[]>;
    public create!: (models: AllModels) => Promise<ProjectType>;
    public static duplicate: (
      id: number,
      author_id: number,
      models: AllModels
    ) => Promise<ProjectType>;
    public static delete: (
      id: number,
      models: AllModels
    ) => Promise<Project | void>;
    public static read: (id: number) => Promise<ProjectExtendedType>;
  }

  const findByPk = (id: number): Promise<Project> =>
    Project.findByPk(id).then(p => {
      if (p === null) {
        const error: ErrorHandler = new Error(
          "Project by this id is not found"
        );
        error.statusCode = 404;
        throw error;
      }
      return p;
    });

  Project.list = (): Promise<ProjectAttributes[]> =>
    Project.findAll({ order: [["createdAt", "asc"]] }).then(ps =>
      ps.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        author_id: project.author_id,
        price_per_hour: project.price_per_hour,
        hours_per_day: project.hours_per_day,
        created_at: project.createdAt,
        updated_at: project.updatedAt,
      }))
    );

  Project.prototype.create = async function (models: AllModels) {
    const p = await Project.create(
      {
        title: this.title,
        description: this.description,
        status: this.status,
        author_id: this.author_id,
        price_per_hour: this.price_per_hour,
        hours_per_day: this.hours_per_day,
        Estimated_scope: this.estimated_scope,
        Estimated_features: [],
      },
      {
        include: [models.Estimated_scope, models.Estimated_feature],
      }
    );
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      author_id: p.author_id,
      price_per_hour: p.price_per_hour,
      hours_per_day: p.hours_per_day,
      estimated_scope_id: p.estimated_scope_id,
    };
  };

  Project.duplicate = async (
    id: number,
    author_id: number,
    models: AllModels
  ) => {
    const p = await findByPk(id);
    const es = await p.getEstimated_scope();
    return Project.create(
      {
        title: p.title,
        description: p.description,
        status: p.status,
        author_id: author_id,
        price_per_hour: p.price_per_hour,
        hours_per_day: p.hours_per_day,
        Estimated_scope: es,
        Estimated_features: [],
      },
      {
        include: [models.Estimated_scope, models.Estimated_feature],
      }
    ).then((p: ProjectType) => ({
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

  Project.delete = (id: number, models: AllModels) =>
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
      } as InstanceDestroyOptions)
    );

  Project.read = async (id: number) => {
    const p = await findByPk(id);
    const estimated_scope = await p.getEstimated_scope();
    const estimated_features = await p.getEstimated_features();
    const totals = calculateTotals(p, estimated_features, estimated_scope);
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
      estimated_scope,
      estimated_features,
      ...totals,
    };
  };

  Project.init(
    {
      title: { type: DataTypes.STRING, allowNull: true },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "in_progress",
          "dev_review",
          "accepted",
          "inactive"
        ),
        defaultValue: "in_progress",
      },
      price_per_hour: DataTypes.INTEGER,
      hours_per_day: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
