// Example file, delete later
const { Model, DataTypes } = require("sequelize");
const { createModel } = require("./helpers/createModel");
const SamplePSQLModel = require('./samplePSQLModel');

class SamplePSQLModel2 extends Model {}

createModel(SamplePSQLModel2, {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  sampleFieldOfForeignTable: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'abc',
    primaryKey: true,
    comment: 'sampleFieldOfForeignTable'
  },
}, {});

// declare related models in the same file
// SamplePSQLModel2.belongsTo(SamplePSQLModel);

module.exports = SamplePSQLModel2;