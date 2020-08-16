"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Team extends sequelize_1.Model {
    }
    Team.init({
        team_name: sequelize_1.DataTypes.STRING,
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Team",
    });
    return Team;
};
