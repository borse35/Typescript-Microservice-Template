const mongoose = require("mongoose");
const config = require("../config");
const { logger } = require('../helpers/utils');

/**
 * return mongo url
 * @param mongoConfig
 * @returns {`mongodb://${string}:${string}/${string}`}
 */
const getMongoUrl = (mongoConfig: object) => {
  // @ts-ignore
  const { host, port, db_name } = mongoConfig;
  return `mongodb://${host}:${port}/${db_name}`
};

// TODO test
/**
 * returns true if mongo connection has been established
 * @returns {boolean}
 */
const isConnected = () => !!mongoose.connection.db;

/**
 * opens mongo connection
 */
export const connect = () => {
  const mongoConfig = config.databases.mongodb;
  if (!mongoConfig) return;

  // return if already connected
  if (isConnected()) return;

  if (config.debugMode) {
    mongoose.set("debug", true);
  }

  const res = mongoose.connect(getMongoUrl(mongoConfig), {
    "useNewUrlParser": true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
  });

  return res.then(() => logger.info("Connected to MongoDB"));
};

/**
 * closes mongo connection
 * @returns {Promise<void>}
 */
export const close = async () => new Promise((resolve, reject) => {
  if (!isConnected()) return resolve(true);

  mongoose.connection.close(function (err: Error) {
    if (err) reject(err);

    logger.info("Closed MongoDb connection");
    resolve(true);
  });
});