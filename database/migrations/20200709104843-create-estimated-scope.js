'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estimated_scopes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      analysis: {
        type: Sequelize.FLOAT
      },
      infrastructure: {
        type: Sequelize.FLOAT
      },
      design: {
        type: Sequelize.FLOAT
      },
      qa: {
        type: Sequelize.FLOAT
      },
      management: {
        type: Sequelize.FLOAT
      },
      release: {
        type: Sequelize.FLOAT
      },
      support: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Estimated_scopes');
  }
};