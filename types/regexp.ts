// @ts-ignore
const safeRegex = require('safe-regex');

class RichRegExp extends RegExp {
  static safe: (...args: any) => RegExp
}

/**
 * creates a safe regex or throws error
 * @param args
 * @returns {*}
 */
RichRegExp.safe = (...args: any): any => {
  if (safeRegex(...args)) { // @ts-ignore
    return RegExp(...args);
  }
  else throw new Error(`Unsafe RegExp ${args}`);
};