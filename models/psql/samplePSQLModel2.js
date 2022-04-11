// Example file, delete later
const { Model, DataTypes } = require("sequelize");
const { createModel, attr } = require("./helpers/createModel");

class SamplePSQLModel2 extends Model {}
const modelName = 'SamplePSQLModel2';

const attributes = {
  sampleFieldOfForeignTable: attr({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'sampleFieldOfForeignTable'
  }),
};

const options = {};

const initializedModel = createModel(modelName, SamplePSQLModel2, attributes, options);

module.exports = {
  [modelName]: initializedModel,
};