"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Estimated_scope extends sequelize_1.Model {
    }
    Estimated_scope.init({
        analysis: sequelize_1.DataTypes.FLOAT,
        isAnalysisActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        infrastructure: sequelize_1.DataTypes.FLOAT,
        isInfrastructureActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        design: sequelize_1.DataTypes.FLOAT,
        isDesignActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        qa: sequelize_1.DataTypes.FLOAT,
        isQaActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        management: sequelize_1.DataTypes.FLOAT,
        isManagementActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        release: sequelize_1.DataTypes.FLOAT,
        isReleaseActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        support: sequelize_1.DataTypes.FLOAT,
        isSupportActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Estimated_scope",
    });
    return Estimated_scope;
};
