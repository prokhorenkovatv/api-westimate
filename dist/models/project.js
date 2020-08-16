"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const calculateTotals_1 = require("utils/calculateTotals");
exports.default = (sequelize) => {
    class Project extends sequelize_1.Model {
    }
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
            Team: this.team,
            Estimated_scope: this.estimated_scope,
            Estimated_features: [],
        }, {
            include: [
                models.Estimated_scope,
                models.Estimated_feature,
                models.Team,
            ],
        });
        // set team_name as project title
        const team = await models.Team.update({ team_name: p.title }, {
            where: {
                id: p.team_id,
            },
        });
        return {
            id: p.id,
            title: p.title,
            description: p.description,
            status: p.status,
            author_id: p.author_id,
            price_per_hour: p.price_per_hour,
            hours_per_day: p.hours_per_day,
            team_id: p.team_id,
            estimated_scope_id: p.estimated_scope_id,
        };
    };
    Project.duplicate = async function (id, author_id, models) {
        const p = await findByPk(id);
        const es = await p.getEstimated_scope();
        const duplicate_p = await Project.create({
            title: p.title,
            description: p.description,
            status: p.status,
            author_id: author_id,
            price_per_hour: p.price_per_hour,
            hours_per_day: p.hours_per_day,
            Team: this.createTeam({ team_name: p.title }),
            Estimated_scope: es,
            Estimated_features: [],
        }, {
            include: [
                models.Estimated_scope,
                models.Estimated_feature,
                models.Team,
            ],
        });
        // await models.Team.update(
        //   { team_name: duplicate_p.title },
        //   {
        //     where: {
        //       id: duplicate_p.team_id,
        //     },
        //   }
        // );
        return {
            id: duplicate_p.id,
            title: duplicate_p.title,
            description: duplicate_p.description,
            status: duplicate_p.status,
            author_id: duplicate_p.author_id,
            price_per_hour: duplicate_p.price_per_hour,
            hours_per_day: duplicate_p.hours_per_day,
            estimated_scope_id: duplicate_p.estimated_scope_id,
        };
    };
    Project.delete = (id, models) => findByPk(id).then(p => p.destroy({
        where: { id },
        cascade: true,
        include: [
            {
                model: [models.Estimated_scope, models.Team],
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
            team_id: p.team_id,
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
