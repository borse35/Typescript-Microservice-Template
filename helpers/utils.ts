import { Err, Req, Res, Next, ReqHandler } from "../types/express";

const { UserError } = require("../errors/UserError");
const { isProduction } = require('../config');
const pinoLogger = require('pino')();
const chalk = require('chalk');

/**
 * checks is error thrown while processing request is thrown purposefully and sends response accordingly.
 * @param err
 * @param req
 * @param res
 * @param next
 */
const reqErrorHandler = (err: Err, req: Req, res: Res, next: Next) => {
  if (err instanceof UserError) {
    res.sendResponse({
      error: {
        type: 'UserError',
        message: err.message,
      }
    }, err.resCode);
  } else {
    logger.errorStr('Error while processing request ' + req.originalUrl);
    logger.error(err);
    next(err);
  }
};

/**
 * wraps req handler in an error handler
 * @param reqHandler
 */
export const handlerWrapper = (reqHandler: ReqHandler) => async (req: Req, res: Res, next: Next) => {
  return await reqHandler(req, res, next).catch((e: Error) => reqErrorHandler(e, req, res, next));
};

/**
 * Checks if all keys of the object are truthy
 * @return {boolean}
 * @param obj
 */
export const assertNonEmpty = (obj: any): boolean => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (!value)
      throw new Error(`${key} is missing`);
  }
  return true;
};

export const waitFor = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));

export const first = (arr: any[]) => arr[0];
export const second = (arr: any[]) => arr[1];

// TODO write fn wrapper to cache results
export const logger = isProduction ? pinoLogger : console;
Object.assign(logger, {
  // printing error strings in red so that they are easier to spot on terminal
  errorStr: (str: string) => logger.error(chalk.red(str))
});

export const promisify = require('util').promisify;