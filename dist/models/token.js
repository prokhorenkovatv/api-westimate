"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Token extends sequelize_1.Model {
    }
    Token.init({
        token_id: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Token",
    });
    return Token;
};
