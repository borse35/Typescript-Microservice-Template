import { Umzug, SequelizeStorage } from 'umzug';
import { logger } from './utils';

let sequelize, umzug: Umzug<any>;

/**
 * initialises umzug
 */
const _initialize = () => {
  if (umzug) return;

  sequelize = require('../connections/pg').getSequelizeConnection();
  umzug = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger,
  });
};

/**
 * returns true if migrations are pending
 */
export const migrationsArePending = async (): Promise<Boolean> => {
  _initialize();

  const pendingMigrations = await umzug.pending();

  if (pendingMigrations.length) {
    console.log(pendingMigrations);
  }
  return !!pendingMigrations.length;
};