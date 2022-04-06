const { validateModel } = require("./validations");
const { assertNonEmpty } = require("../../../helpers/utils");

const _addCustomProps = modelClass => {
  // override and add custom props here
};

/**
 * creates a sequelize model after some basic validations
 * @param modelClass
 * @param attributes
 * @param options
 * @returns {*}
 */
module.exports.createModel = (modelClass, attributes, options = {}) => {
  const sequelize = require('../../../connections/pg').getSequelizeConnection();
  assertNonEmpty({ sequelize });

  Object.assign(options, {
    sequelize, // connection instance
    paranoid: true, // only allow soft deletes
  });

  modelClass.init(attributes, options);

  _addCustomProps(modelClass);

  // validating model
  validateModel(modelClass, attributes, options);

  return modelClass;
};