// Example file, delete later
const { Model, DataTypes, Deferrable } = require("sequelize");
const { createModel } = require("./helpers/createModel");
const SamplePSQLModel2 = require('./samplePSQLModel2').SamplePSQLModel2 || {};

class SamplePSQLModel extends Model {
  getField1() {
    return this.field1;
  }
}

const modelName = 'SamplePSQLModel';

const attributes = {
  field1: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'abc',
    primaryKey: true,
    comment: 'field1'
  },
  field2: {
    type: DataTypes.STRING, // should be same as reference
    references: {
      model: SamplePSQLModel2.tableName, // table name i.e. plural
      key: 'sampleFieldOfForeignTable',
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    comment: 'field2',
  }
};

const options = {
  indexes: [{
    fields: ['field1', 'field1'],
    where: {
      createdAt: {
        $gt: new Date(2022, 0, 1),
      }
    }
  }]
};

const initializedModel = createModel(modelName, SamplePSQLModel, attributes, options);

// create association only if initialisation has been successful
if (initializedModel.initialized) {
  SamplePSQLModel.belongsTo(SamplePSQLModel2.model, {
    onDelete: 'RESTRICT', // RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL.
    onUpdate: 'RESTRICT',
    targetKey: 'sampleFieldOfForeignTable',
    sourceKey: 'field2',
    // as: '',
    foreignKey: 'field2',
    allowNull: false, // every SamplePSQLModel2 row must have a reference to SamplePSQLModel
  });
}

module.exports = {
  [modelName]: initializedModel,
};

