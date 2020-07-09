"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../database/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {
  Project: require("./project")(sequelize, Sequelize),
  Estimated_scope: require("./estimated_scope")(sequelize, Sequelize),
  User: require("./user")(sequelize, Sequelize),
  Estimated_feature: require("./estimated_feature")(sequelize, Sequelize),
  Default_feature: require("./default_feature")(sequelize, Sequelize),
  Token: require("./token")(sequelize, Sequelize),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
