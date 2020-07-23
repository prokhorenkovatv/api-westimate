"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("database/config.json")[env];
const project_1 = __importDefault(require("models/project"));
const estimated_scope_1 = __importDefault(require("models/estimated_scope"));
const estimated_feature_1 = __importDefault(require("models/estimated_feature"));
const default_feature_1 = __importDefault(require("models/default_feature"));
const token_1 = __importDefault(require("models/token"));
const user_1 = __importDefault(require("models/user"));
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
}
// const db: DB = {
//   Project: sequelize.models.Project,
//   Estimated_scope: sequelize.models.Estimated_scope,
//   User: sequelize.models.User,
//   Estimated_feature: sequelize.models.Estimated_feature,
//   Default_feature: sequelize.models.Default_feature,
//   Token: sequelize.models.Token,
// };
// Object.keys(db).forEach(modelName => {
//   console.log(db);
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// export default db;
const db = {
    Project: project_1.default(sequelize),
    Estimated_scope: estimated_scope_1.default(sequelize),
    Estimated_feature: estimated_feature_1.default(sequelize),
    Default_feature: default_feature_1.default(sequelize),
    Token: token_1.default(sequelize),
    User: user_1.default(sequelize),
};
const applyExtraSetup = (db) => {
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
applyExtraSetup(db);
exports.default = db;
