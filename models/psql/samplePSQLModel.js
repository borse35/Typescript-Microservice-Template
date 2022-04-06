// Example file, delete later
const { Model, DataTypes, Deferrable } = require("sequelize");
const { createModel } = require("./helpers/createModel");
const SamplePSQLModel2 = require('./samplePSQLModel2');

class SamplePSQLModel extends Model {
  getField1() { return this.field1; }
}

createModel(SamplePSQLModel, {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  field1: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'abc',
    primaryKey: true,
    comment: 'field1'
  },
  field2: {
    type: DataTypes.BIGINT,
    field: 'field_2_custom_column_name',// custom column name
    references: {
      model: 'SamplePSQLModel2', // foreign key
      key: 'sampleFieldOfForeignTable',
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    comment: 'field2',
  }
}, {
  indexes: [{
    fields: ['field1', 'field1'],
    where: {
      createdAt: {
        $gt: new Date(2022, 0, 1),
      }
    }
  }]
});

// SamplePSQLModel.belongsToMany(SamplePSQLModel2, { through: 'SamplePSQLModelToSamplePSQLModel2Mapping' });

SamplePSQLModel.hasOne(SamplePSQLModel2, {
  onDelete: 'RESTRICT', // RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL.
  onUpdate: 'RESTRICT',
  foreignKey: 'sample_psql_model_id',
  // targetKey: '',
  // sourceKey: '',
  // as: '',
  allowNull: false, // every SamplePSQLModel2 row must have a reference to SamplePSQLModel
});

(async () => {
  console.log(await SamplePSQLModel.findOne())
})();

module.exports = SamplePSQLModel;

