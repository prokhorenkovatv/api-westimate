"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        // estimated_scope hasOne Project
        return queryInterface
            .addColumn("Projects", "estimated_scope_id", {
            type: Sequelize.INTEGER,
            references: {
                model: "Estimated_scopes",
                key: "id",
            },
            onUpdate: "SET NULL",
            onDelete: "CASCADE",
        })
            .then(() => {
            //team hasOne Project
            return queryInterface.addColumn("Projects", "team_id", {
                type: Sequelize.INTEGER,
                references: {
                    model: "Teams",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        })
            .then(() => {
            // project hasMany estimated_features
            return queryInterface.addColumn("Estimated_features", "project_id", {
                type: Sequelize.INTEGER,
                references: {
                    model: "Projects",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        })
            .then(() => {
            //user hasMany projects
            return queryInterface.addColumn("Projects", "author_id", {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            });
        })
            .then(() => {
            //user hasOne token
            return queryInterface.addColumn("Tokens", "user_id", {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            });
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface
            .removeColumn("Projects", "estimated_scope_id")
            .then(() => {
            return queryInterface.removeColumn("Projects", "team_id");
        })
            .then(() => {
            return queryInterface.removeColumn("Estimated_features", "project_id");
        })
            .then(() => {
            return queryInterface.removeColumn("Projects", "author_id");
        })
            .then(() => {
            return queryInterface.removeColumn("Tokens", "user_id");
        });
    },
};
