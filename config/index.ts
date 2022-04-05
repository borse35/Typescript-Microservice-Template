const nconf = require("nconf"),
  env = process.env.NODE_ENV || "development";

nconf.argv()
  .env()
  .file({ file: `./config/${env}.json` });

// not picking anything and everything from the config
const allowedConfigKeys = ['service_name', 'apm_name', 'redis_prefix', 'server', 'databases', 'services', 'rateLimiterConf'];
const configReducer = (config: { [s: string]: any }, key: string) => {
  const configVal = nconf.get(key);
  if (configVal)
    config[key] = configVal;
  return config;
};

module.exports = {
  isProduction: env === 'production',
  env: process.env.NODE_ENV,
  databases: {},
  rateLimiterConf: {},
  server: {
    port: 3000
  },
  ...allowedConfigKeys.reduce(configReducer, {}),
  debugMode: [true, 'true'].includes(nconf.get('debug_mode')), // use for logging
};
