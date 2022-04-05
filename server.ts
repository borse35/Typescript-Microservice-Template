import http from "http";

const express = require('express');
const app = express();
const config = require("./config");
const connections = require('./connections');
const { logger } = require('./helpers/utils');

// TODO add safe-regex usage example
// TODO add validator usage example
// TODO add joi usage example
// TODO add "celebrate" usage example
// TODO add express-rate-limit usage example

(async () => {

  // adding middlewares
  app.use(...require('./middlewares').mandatory);

  // establishing connections
  await connections.establishConnections();

  // registering routes
  app.use(require('./routes'));

  // starting server
  const server: http.Server = app.listen(config.server.port, () => {
    logger.info(`Listening on ${config.server.port}`);
  });

  // registering event listeners
  require('./events')(server);


})();