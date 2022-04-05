// sequelize-cli will use this file to get config for pg connection
const config = require('config/index');

// assuming postgres is being used
const sequelizeConfig = {
  [config.env]: {
    ...require("../connections/pg").getDbOptions(config.databases.pg.primary),
    dialect: config.databases.pg.dialect,
    // Use a different storage. Default: none
    "seederStorage": "sequelize",
  }
};

export = sequelizeConfig;