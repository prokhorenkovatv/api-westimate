"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    class Estimated_feature extends sequelize_1.Model {
    }
    Estimated_feature.init({
        title: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        frontend_days: sequelize_1.DataTypes.INTEGER,
        backend_days: sequelize_1.DataTypes.INTEGER,
        project_id: sequelize_1.DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "Estimated_feature",
    });
    Estimated_feature.list = (project_id) => Estimated_feature.findAll({
        order: [["createdAt", "asc"]],
        where: project_id ? { project_id: project_id } : null,
    }).then(ef => ef.map(feature => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        frontend_days: feature.frontend_days,
        backend_days: feature.backend_days,
        project_id: feature.project_id,
        created_at: feature.createdAt,
        updated_at: feature.updatedAt,
    })));
    Estimated_feature.prototype.create = async function () {
        const ef = await Estimated_feature.create({
            title: this.title,
            description: this.description,
            frontend_days: this.frontend_days,
            backend_days: this.backend_days,
            project_id: this.project_id,
        });
        return ef;
    };
    const findFeatureByPk = (id) => Estimated_feature.findByPk(id).then(ef => {
        if (ef === null) {
            const error = new Error("Estimated feature by this id is not found");
            error.statusCode = 404;
            throw error;
        }
        return ef;
    });
    Estimated_feature.update = (id, updateFields) => findFeatureByPk(id).then(ef => ef.update(updateFields));
    Estimated_feature.delete = (id) => findFeatureByPk(id).then(ef => ef.destroy({ where: { id } }));
    Estimated_feature.read = async function (id) {
        const ef = await findFeatureByPk(id);
        return ef;
    };
    return Estimated_feature;
};
