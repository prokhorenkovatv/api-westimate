"use strict";

import { Sequelize, Model, ModelCtor } from "sequelize";
import project from "models/project";
import estimated_scope from "models/estimated_scope";
import estimated_feature from "models/estimated_feature";
import default_feature from "models/default_feature";
import token from "models/token";
import user from "models/user";

const env = process.env.NODE_ENV || "development";
const config = require("database/config.json")[env];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

interface DB {
  [key: string]: ModelCtor<Model<any, any>>;
}

const db = {
  Project: project(sequelize),
  Estimated_scope: estimated_scope(sequelize),
  Estimated_feature: estimated_feature(sequelize),
  Default_feature: default_feature(sequelize),
  Token: token(sequelize),
  User: user(sequelize),
};

const applyAssociations = (db: DB) => {
  const { Project, Estimated_scope, Estimated_feature, User, Token } = db;

  Project.hasMany(Estimated_feature, {
    foreignKey: "project_id",
    onDelete: "CASCADE",
  });
  Project.belongsTo(Estimated_scope, {
    foreignKey: {
      name: "estimated_scope_id",
      allowNull: false,
    },
    onDelete: "CASCADE",
  });
  Estimated_scope.hasOne(Project, {
    foreignKey: "estimated_scope_id",
  });
  Token.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
  User.hasMany(Project, {
    foreignKey: "author_id",
    onDelete: "CASCADE",
  });
};

applyAssociations(db);

export default db;
