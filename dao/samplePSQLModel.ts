// Example file, delete later

const SamplePSQLModel = require('../models/psql/samplePSQLModel');

export const createSampleRow = async () => await SamplePSQLModel.create({
  field1: 'def',
  field2: parseInt((Math.random() * 10000).toString()),
});

export const getSampleRow = async () => await SamplePSQLModel.findOne({});