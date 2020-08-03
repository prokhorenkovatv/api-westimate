"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class User extends sequelize_1.Model {
    }
    User.init({
        first_name: sequelize_1.DataTypes.STRING,
        last_name: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.STRING,
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: sequelize_1.DataTypes.STRING,
        gender: sequelize_1.DataTypes.TINYINT,
        onboarding_at: sequelize_1.DataTypes.DATE,
    }, {
        sequelize: sequelize,
        modelName: "User",
    });
    return User;
};
