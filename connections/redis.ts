const Redis = require("ioredis");
const config = require("../config");
const { logger, promisify } = require('../helpers/utils');

// redis instance
let redisConnection: typeof Redis.Redis;

// TODO test
/**
 * returns true if mongo connection has been established
 * note: found "valid" statuses defined in redis.connect fn
 * @returns {boolean}
 */
const isConnected = () => !!redisConnection && ['connecting', 'connect', 'ready'].includes(redisConnection.status);

/**
 * opens pg connection
 */
export const connect = () => {
	const redisConfig = config.databases.redis;
	if (!redisConfig) return;

	// return if already connected
	if (isConnected()) return redisConnection;

	redisConnection = new Redis({
		port: redisConfig.port,
		host: redisConfig.host,
		username: redisConfig.username,
		password: redisConfig.password,
		keyPrefix: redisConfig.key_prefix,
		connectTimeout: 1000,
		maxLoadingRetryTime: 1000,
	});

  if (!isConnected()) throw new Error('Unable to connect to Redis');

  return logger.info('Connected to Redis');
};

/**
 * closes pg connection
 */
export const close = async () => {
	if (!isConnected()) return;

	await promisify(redisConnection.quit.bind(redisConnection))();
	logger.info('Closed Redis connection');
};