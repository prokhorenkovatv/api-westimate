"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const calculateTotals_1 = require("utils/calculateTotals");
exports.default = (sequelize) => {
    class Project extends sequelize_1.Model {
    }
    Project.associate = (models) => {
        models.Project.hasMany(models.Estimated_feature, {
            foreignKey: "project_id",
            onDelete: "CASCADE",
        });
        models.Project.belongsTo(models.Estimated_scope, {
            foreignKey: {
                name: "estimated_scope_id",
                allowNull: false,
            },
            onDelete: "CASCADE",
        });
    };
    const findByPk = (id) => Project.findByPk(id).then(p => {
        if (p === null) {
            const error = new Error("Project by this id is not found");
            error.statusCode = 404;
            throw error;
        }
        return p;
    });
    Project.list = () => Project.findAll({ order: [["createdAt", "asc"]] }).then(ps => ps.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        author_id: project.author_id,
        price_per_hour: project.price_per_hour,
        hours_per_day: project.hours_per_day,
        created_at: project.createdAt,
        updated_at: project.updatedAt,
    })));
    Project.prototype.create = async function (models) {
        const p = await Project.create({
            title: this.title,
            description: this.description,
            status: this.status,
            author_id: this.author_id,
            price_per_hour: this.price_per_hour,
            hours_per_day: this.hours_per_day,
            Estimated_scope: this.estimated_scope,
            Estimated_features: [],
        }, {
            include: [models.Estimated_scope, models.Estimated_feature],
        });
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
    Project.duplicate = async (id, author_id, models) => {
        const p = await findByPk(id);
        const es = await p.getEstimated_scope();
        return Project.create({
            title: p.title,
            description: p.description,
            status: p.status,
            author_id: author_id,
            price_per_hour: p.price_per_hour,
            hours_per_day: p.hours_per_day,
            Estimated_scope: es,
            Estimated_features: [],
        }, {
            include: [models.Estimated_scope, models.Estimated_feature],
        }).then((p) => ({
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
    Project.delete = (id, models) => findByPk(id).then(p => p.destroy({
        where: { id },
        cascade: true,
        include: [
            {
                model: models.Estimated_scope,
                cascade: true,
            },
        ],
    }));
    Project.read = async (id) => {
        const p = await findByPk(id);
        const estimated_scope = await p.getEstimated_scope();
        const estimated_features = await p.getEstimated_features();
        const totals = calculateTotals_1.calculateTotals(p, estimated_features, estimated_scope);
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
    Project.init({
        title: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("in_progress", "dev_review", "accepted", "inactive"),
            defaultValue: "in_progress",
        },
        price_per_hour: sequelize_1.DataTypes.INTEGER,
        hours_per_day: sequelize_1.DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "Project",
    });
    return Project;
};
