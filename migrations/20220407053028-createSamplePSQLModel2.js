'use strict';
const { SamplePSQLModel2 } = require('../models/psql/samplePSQLModel2');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable(SamplePSQLModel2.tableName, SamplePSQLModel2.attributes, { transaction });
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
      await queryInterface.dropTable(SamplePSQLModel2.tableName, { transaction });
    });
  }
};
