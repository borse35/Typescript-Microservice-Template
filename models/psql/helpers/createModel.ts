import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
const { validateModel } = require("./validations");
const sequelize = require('../../../connections/pg').connect();

const _addCustomProps = (modelClass: any) => {
  // override and add custom props here
  return modelClass;
};

/**
 * creates a sequelize model after some basic validations
 * @param modelClass
 * @param attributes
 * @param options
 * @returns {*}
 */
module.exports.createModel = (modelClass: any, attributes: object, options = {}) => {
  Object.assign(options, {
    sequelize, // connection instance
    paranoid: true, // only allow soft deletes
  });

  // validating model
  validateModel(modelClass, attributes, options);

  modelClass.init(attributes, options);

  _addCustomProps(modelClass);

  return modelClass;
};