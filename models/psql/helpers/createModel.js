const { validateModel } = require("./validations");
const { assertNonEmpty, logger } = require("../../../helpers/utils");
const inflection = require('inflection');
const { Sequelize, DataTypes } = require('sequelize');

const _addCustomProps = modelClass => {
  // override and add custom props here
};

// paranoid tables, allowing only soft deletes
const PARANOID = true;

const implicitAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: PARANOID ? { // if paranoid
    type: Sequelize.DATE
  } : undefined,
};

// will be useful during migrations
const updateAttributes = attributes => ({ ...attributes, ...implicitAttributes });

/**
 * creates a sequelize model after some basic validations
 * @param modelName
 * @param modelClass
 * @param attributes
 * @param options
 * @returns {*}
 */
module.exports.createModel = (modelName, modelClass, attributes, options = {}) => {
  const sequelize = require('../../../connections/pg').getSequelizeConnection();
  const result = {
    modelName,
    tableName: inflection.pluralize(modelName),
    initialized: false,
    attributes: updateAttributes(attributes),
    options,
  };

  if (!sequelize) {
    logger.info('sequelize connection not founding, not creating model');
    return result;
  }
  assertNonEmpty({ sequelize });

  Object.assign(options, {
    sequelize, // connection instance
    paranoid: PARANOID,
  });

  modelClass.init(attributes, options);

  _addCustomProps(modelClass);

  // validating model
  validateModel(modelClass, attributes, options);

  // final step
  result.initialized = true;
  result.model = modelClass;
  return result;
};