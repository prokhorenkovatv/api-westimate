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
      isAnalysisActive: {
        type: Sequelize.BOOLEAN
      },
      infrastructure: {
        type: Sequelize.FLOAT
      },
      isInfrastructureActive: {
        type: Sequelize.BOOLEAN
      },
      design: {
        type: Sequelize.FLOAT
      },
      isDesignActive: {
        type: Sequelize.BOOLEAN
      },
      qa: {
        type: Sequelize.FLOAT
      },
      isQaActive: {
        type: Sequelize.BOOLEAN
      },
      management: {
        type: Sequelize.FLOAT
      },
      isManagementActive: {
        type: Sequelize.BOOLEAN
      },
      release: {
        type: Sequelize.FLOAT
      },
      isReleaseActive: {
        type: Sequelize.BOOLEAN
      },
      support: {
        type: Sequelize.FLOAT
      },
      isSupportActive: {
        type: Sequelize.BOOLEAN
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