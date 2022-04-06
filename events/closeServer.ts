// closing connections then exiting process
import http from "http";

const { logger } = require("../helpers/utils");
const connections = require("../connections");

let serverLocal: http.Server;

/**
 * closes all db connections and exits server gracefully
 * @param event
 */
export const exitGracefully = (event: any) => {
  console.log('\n');
  logger.error(`${event} signal received: closing HTTP server`);

  connections
    .closeConnections()
    .then(() => {
      logger.info('Closed all db connections');

      serverLocal && serverLocal.close(() => {
        logger.info('HTTP server closed');
        process.exit(1);
      });
    })
    .catch((e: Error) => {
      logger.error(`Error while closing connections`);
      logger.error(e);
      process.exit(1);
    });
};

process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    logger.error(err, 'Uncaught Exception thrown');
  })
  .on('SIGINT', exitGracefully)
  .on('SIGQUIT', exitGracefully)
  .on('SIGTERM', exitGracefully);

const initializeServer = (server: http.Server) => serverLocal = server;
export default initializeServer;