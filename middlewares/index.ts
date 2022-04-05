import RateLimitRequestHandler from "express-rate-limit";
import { Next, Req, Res } from "../types/express";

const express = require("express");
const helmet = require("helmet"); // https://github.com/helmetjs/helmet TODO read
const errorhandler = require("errorhandler");
const passport = require("passport");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit").rateLimit;
const { isProduction, rateLimiterConf } = require('../config');

// TODO add apm
// TODO add sentry
// TODO add passport?
// TODO add cors?

/**
 * parses req body
 * @type {createServer.NextHandleFunction}
 */
const bodyParser = express.json({
  inflate: false, // delegate to nginx?
  limit: '100kb',
});

/**
 * log dev errors
 */
const developmentErrorHandler = isProduction ? null : errorhandler();

const getResponseSender = (res: Res) =>
  (data: object, status = 200) => // @ts-ignore TODO debug
    res.status(status).json({ data });
/**
 * custom fn to validate and send response
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const responseSender = (req: Req, res: Res, next: Next) => {
  res.sendResponse = getResponseSender(res);
  console.log('attached 1');
  next();
};


/**
 * auth
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const authorized = async (req: Req, res: Res, next: Next) => {
  throw new Error('Not Authorized!');
};

/**
 * limit incoming requests from same client
 * @returns {RateLimitRequestHandler}
 */
const limitRate = rateLimiter({
  legacyHeaders: false,
  statusCode: rateLimiterConf.statusCode,
  message: rateLimiterConf.message,
});

export = {
  mandatory: [
    developmentErrorHandler,                                                // log errors to console in dev env
    bodyParser,                                                             // parses request body
    responseSender,                                                         // custom fn to validate and send response
    helmet(),                                                               // alters headers to increase security
    morgan('short'),                                                        // log incoming api calls
    limitRate,                                                              // rate limiter
  ].filter(Boolean),                                                        // some middlewares maybe env specific
  authorized,                                                               // auth
};