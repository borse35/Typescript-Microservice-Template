// closing connections then exiting process
import http from "http";
import { promisify } from "../helpers/utils";

const { logger } = require("../helpers/utils");
const connections = require("../connections");

let serverLocal: http.Server;

/**
 * closes all db connections and exits server gracefully
 * @param event
 */
export const exitGracefully = async (event: any) => {
  console.log('\n');
  logger.errorStr(`${event} signal received: closing HTTP server`);

  await connections.closeConnections().catch((e: Error) => {
    logger.errorStr(`Error while closing connections`);
    logger.error(e);
    process.exit(1);
  });
  logger.info('Closed all db connections');

  if (serverLocal) {
    await promisify(serverLocal.close);
    logger.info('HTTP server closed');
  }

  process.exit(0);
};

process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason);
    logger.errorStr('Unhandled Rejection at Promise');
    logger.error(p);
  })
  .on('uncaughtException', err => {
    logger.error(err);
    logger.errorStr('Uncaught Exception thrown');
  })
  .on('SIGINT', exitGracefully)
  .on('SIGQUIT', exitGracefully)
  .on('SIGTERM', exitGracefully);

const initializeServer = (server: http.Server) => serverLocal = server;
export default initializeServer;