"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class User_Team extends sequelize_1.Model {
    }
    User_Team.init({
        team_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Teams",
                key: "id",
            },
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
    }, {
        sequelize,
        modelName: "User_Team",
    });
    return User_Team;
};
