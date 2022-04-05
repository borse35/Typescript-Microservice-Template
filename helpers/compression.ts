const snappy = require('snappy');

/**
 * compresses data
 * @param string
 * @returns {Promise<Buffer>}
 */
export const compress = async (string: string) => await snappy.compress(string);

/**
 * uncompresses compressed data
 * @param string
 * @returns {Promise<string|Buffer>}
 */
export const uncompress = async (string: string) => await snappy.uncompress(string, { asBuffer: false });