'use strict';
const { SamplePSQLModel } = require('../models/psql/samplePSQLModel');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(SamplePSQLModel.tableName, SamplePSQLModel.attributes, { transaction });
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable(SamplePSQLModel.tableName, { transaction });
    });
  }
};
