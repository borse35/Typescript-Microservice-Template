// Example file, delete later
const { Model, DataTypes } = require("sequelize");
const { createModel } = require("./helpers/createModel");

class SamplePSQLModel2 extends Model {}
const modelName = 'SamplePSQLModel2';

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  sampleFieldOfForeignTable: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'sampleFieldOfForeignTable'
  },
};

const options = {};

const initializedModel = createModel(modelName, SamplePSQLModel2, attributes, options);

module.exports = {
  [modelName]: initializedModel,
};