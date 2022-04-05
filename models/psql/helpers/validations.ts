const { noCase, pascalCase, snakeCase } = require('change-case');
const { assertNonEmpty } = require('../../../helpers/utils');
const { intersection } = require('ramda');

const isPascalCase = (str: string) => str && str.length && pascalCase(noCase(str)) === str;

const isSnakeCase = (str: string) => str && str.length && snakeCase(noCase(str)) === str;

const validateModelName = (modelName: string) => {
  if (!isPascalCase(modelName)) throw new Error(`Invalid model name ${modelName}`);

  return true;
};

/**
 * validates an attribute in sequelize model
 * @param modelName
 * @param attributeName
 * @param attrConfig
 * @returns {boolean}
 */
const validateAttribute = (modelName: string, attributeName: string, attrConfig: any) => {
  assertNonEmpty({ modelName, attributeName, attrConfig });

  if (!snakeCase(attributeName)) throw new Error(`Invalid attribute ${attributeName} in model ${modelName}`);

  if (typeof attrConfig !== 'object')
    throw new Error(`Invalid attr config for attribute ${attributeName} in model ${modelName}`);

  if (!attrConfig.comment || !attrConfig.comment.length)
    throw new Error(`Comment is missing for attribute ${attributeName} in model ${modelName}`);

  return true;
};

/**
 * validates model attributes
 * @param modelName
 * @param classAttributes
 * @param attributes
 * @returns {boolean}
 */
const validateAttributes = (modelName: string, classAttributes: string[], attributes: any) => {
  const dbAttributes = Object.keys(attributes)

  // checking for overlapping attributes. ref https://sequelize.org/v6/manual/model-basics.html#:~:text=are%20essentially%20equivalent.-,Caveat%20with%20Public%20Class%20Fields,-Adding%20a%20Public
  const attributeIntersection = intersection(dbAttributes, classAttributes);
  if (attributeIntersection.length)
    throw new Error(`${modelName} Class attributes are overriding table\' fields: ${attributeIntersection}`);
  
  dbAttributes.forEach(attributeName => {
    validateAttribute(modelName, attributeName, attributes[attributeName]);
  });

  return true;
};

// TODO
const validateOptions = (options: any) => {
  return options;
};

/**
 * validates model before initializing it with sequelize
 * @param modelClass
 * @param attributes
 * @param options
 */
module.exports.validateModel = (modelClass: any, attributes: any, options: any) => {
  const modelName = new modelClass().constructor.name;
  const classAttributes = Object.keys(new modelClass);

  validateModelName(modelName);
  validateAttributes(modelName, classAttributes, attributes);
  validateOptions(options);
};

