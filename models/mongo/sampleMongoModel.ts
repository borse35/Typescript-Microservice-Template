// Example file, delete later

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SampleMongoModel = new Schema({
  field1: ObjectId,
  field2: { type: String, index: true },
  field3: Date
}, { timestamps: true });

SampleMongoModel.index({ field3: 1 }, { sparse: true });

module.exports = SampleMongoModel;
