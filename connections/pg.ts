import { migrationsArePending } from "../helpers/migrations";
import { exitGracefully } from "../events/closeServer";
const { Sequelize, Transaction } = require('sequelize');
const cls = require('cls-hooked');

const config = require("../config");
const { logger, assertNonEmpty } = require('../helpers/utils');

type SequelizeObj = typeof Sequelize;
let sequelize: SequelizeObj;

export const getSequelizeConnection = () => sequelize;

/**
 * setting namespace so that transaction instance is automatically passed to sequelize in managed transaction block
 */
const setTransactionNameSpace = () => {
  const namespace = cls.createNamespace('transaction-namespace');
  Sequelize.useCLS(namespace);
};

/**
 * returns true if mongo connection has been established
 * @returns {Promise<boolean>}
 */
const isConnected = async () => !!sequelize
  && await sequelize
    .authenticate({ retry: null })
    .then(() => true)
    .catch((e: Error) => {
      console.log(e);
      return false;
    });

/**
 * validates and return necessary db options
 * @param dbConfig
 * @param throwError
 * @param dialect
 * @returns {{password, database, port, host, username}|null}
 */
const getDbOptions = (dbConfig: object, { throwError = true } = {}) => {
  assertNonEmpty({ dbConfig });
  // @ts-ignore
  const { host, port, username, password, db_name: database } = dbConfig;

  try {
    assertNonEmpty({ host, port, database });
    return { host, port, username, password, database };
  } catch (e) {
    if (throwError) throw new Error(`Invalid PG config: ${JSON.stringify(dbConfig)}`);
    else return null;
  }
}
module.exports.getDbOptions = getDbOptions;

/**
 * creates pg connection
 * @param pgConfig
 * @returns {SequelizeObj}
 */
const createConnection = async (pgConfig: { replicas: any; primary: object; dialect: any; }): Promise<SequelizeObj> => {
  // const getReadReplicaConfig = (dbConfig: object) => getDbOptions(dbConfig, { throwError: false });

  const { host, port, username, password, db_name: database } = (pgConfig.primary as any);
  assertNonEmpty({ host, port, username, password, database });

  sequelize = new Sequelize({
    // operatorsAliases: PSQL_OP_ALIASES, // simpler aliases for sequelize operators
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // transaction isolation level
    // replication: {
    //   read: (pgConfig.replicas || []).map(getReadReplicaConfig).filter(Boolean), // read replicas
    //   write: getDbOptions(pgConfig.primary) // primary
    // },
    host,
    port,
    username,
    password,
    database,
    dialect: pgConfig.dialect,
  });
  setTransactionNameSpace();

  if (!await isConnected()) throw new Error('Unable to connect to Postgres');
  return sequelize;
};

/**
 * opens pg connection
 */
export const connect = async (): Promise<SequelizeObj> => {
  const pgConfig = config.databases.pg;
  if (!pgConfig) return;

  // return if already connected
  if (await isConnected()) return sequelize;

  await createConnection(pgConfig);

  logger.info('Connected to Postgres');

  if (await migrationsArePending()) {
    logger.errorStr('Some migrations are pending');
    await exitGracefully('MigrationPending');
    // TODO auto run pending migrations with confirmation from cmd line input
  }

  return sequelize;
};

/**
 * closes pg connection
 */
export const close = async (): Promise<void> => {
  if (!await isConnected()) return;

  await sequelize.close();
  logger.info('Closed Postgres connection');
};