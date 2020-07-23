"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const calculateTotals_1 = require("utils/calculateTotals");
exports.default = (sequelize) => {
    class Project extends sequelize_1.Model {
        create(models) {
            return Project.create({
                title: this.title,
                description: this.description,
                status: this.status,
                author_id: this.author_id,
                price_per_hour: this.price_per_hour,
                hours_per_day: this.hours_per_day,
                Estimated_scope: {
                    analysis: this.analysis,
                    isAnalysisActive: this.isAnalysisActive,
                    infrastructure: this.infrastructure,
                    isInfrastructureActive: this.isInfrastructureActive,
                    design: this.design,
                    isDesignActive: this.isDesignActive,
                    qa: this.qa,
                    isQaActive: this.isQaActive,
                    management: this.management,
                    isManagementActive: this.isManagementActive,
                    release: this.release,
                    isReleaseActive: this.isReleaseActive,
                    support: this.support,
                    isSupportActive: this.isSupportActive,
                },
                Estimated_features: [],
            }, {
                include: [models.Estimated_scope, models.Estimated_feature],
            }).then(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                status: p.status,
                author_id: p.author_id,
                price_per_hour: p.price_per_hour,
                hours_per_day: p.hours_per_day,
                estimated_scope_id: p.estimated_scope_id,
            }));
        }
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
            Estimated_scope: {
                analysis: es.analysis,
                isAnalysisActive: es.isAnalysisActive,
                infrastructure: es.infrastructure,
                isInfrastructureActive: es.isInfrastructureActive,
                design: es.design,
                isDesignActive: es.isDesignActive,
                qa: es.qa,
                isQaActive: es.isQaActive,
                management: es.management,
                isManagementActive: es.isManagementActive,
                release: es.release,
                isReleaseActive: es.isReleaseActive,
                support: es.support,
                isSupportActive: es.isSupportActive,
            },
            Estimated_features: [],
        }, {
            include: [models.Estimated_scope, models.Estimated_feature],
        }).then(p => ({
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
            estimated_scope: {
                analysis: estimated_scope.analysis,
                isAnalysisActive: estimated_scope.isAnalysisActive,
                infrastructure: estimated_scope.infrastructure,
                isInfrastructureActive: estimated_scope.isInfrastructureActive,
                design: estimated_scope.design,
                isDesignActive: estimated_scope.isDesignActive,
                qa: estimated_scope.qa,
                isQaActive: estimated_scope.isQaActive,
                management: estimated_scope.management,
                isManagementActive: estimated_scope.isManagementActive,
                release: estimated_scope.release,
                isReleaseActive: estimated_scope.isReleaseActive,
                support: estimated_scope.support,
                isSupportActive: estimated_scope.isSupportActive,
            },
            estimated_features,
            ...calculateTotals_1.calculateTotals(p, estimated_scope, estimated_features),
        };
    };
    const findByPk = (id) => Project.findByPk(id).then(p => {
        if (p === null) {
            const error = new Error("Project by this id is not found");
            error.statusCode = 404;
            throw error;
        }
        return p;
    });
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
