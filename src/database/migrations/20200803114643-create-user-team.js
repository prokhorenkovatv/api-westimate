"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User_Teams", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      team_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User_Teams");
  },
};
