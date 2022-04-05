import RichPromise from "../types/promise";
import { first, second } from "../helpers/utils";
const mongo = require("./mongodb");
const postgres = require("./pg");
const redis = require("./redis");
const { exitGracefully } = require("../events/closeServer");
const { MAX_CONNECTION_DELAY } = require("../constants");

const catchPromise = (msg: string) => (err: Error) => {
  console.log(err);
  exitGracefully(msg);
};

/**
 * opens all external connections
 * @returns {Promise<void>}
 */
module.exports.establishConnections = () => {
  const connectionPromises: [Promise<any>, string][] = [
    [mongo.connect(), 'MongoDb connection request timedout'],
    [postgres.connect(), 'PG connection request timedout'],
    [redis.connect(), 'Redis connection request timedout'],
  ];

  return RichPromise.allTimeout(
    connectionPromises.map(first),
    MAX_CONNECTION_DELAY,
    connectionPromises.map(second),
  ).catch(catchPromise('ConnectionError'));
};

/**
 * closes all external connrections
 * @returns {Promise<void>}
 */
module.exports.closeConnections = async () => {
  const closingPromises = [
    [mongo.close(), 'MongoDb connection closing request timedout'],
    [postgres.close(), 'PG connection closing request timedout'],
    [redis.close(), 'Redis connection closing request timedout'],
  ];

  return RichPromise.allTimeout(
    closingPromises.map(first),
    MAX_CONNECTION_DELAY,
    closingPromises.map(second),
  ).catch(catchPromise('ShutDownError'));
};