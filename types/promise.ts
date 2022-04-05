// @ts-ignore
class RichPromise extends Promise {
  static timeout: (promise: Promise<any>, timeout: number, errMsg?: string) => Promise<any>
  static allTimeout: (promises: Promise<any>[], timeout: number, errorMessages?: string[]) => Promise<any>
}

/**
 * error is thrown if given promise does not resolve before "timeout" ms
 * @param promise {Promise} promise to be timed
 * @param timeout {number} ms
 * @param errMsg {string} error message to be thrown if given promise times out
 * @returns {Promise<void>}
 */
RichPromise.timeout = async (promise: Promise<any>, timeout: number, errMsg: string = 'Promise timed out'): Promise<void> => new Promise((resolve, reject) => {
  let timerId: NodeJS.Timeout;
  const timerPromise = new Promise((res, rej) => {
    timerId = setTimeout(() => {
      reject(errMsg);
    }, timeout);
  });

  Promise.race([
    promise,
    timerPromise,
  ]).then(result => {
    clearTimeout(timerId);
    resolve(result);
  });
});

/**
 * timeout for multiple promises. If any of the promises exceed the time-limit, promise is rejected
 * @param promises {Promise[]}
 * @param timeout {number}
 * @param errorMessages {string}
 * @returns {Promise<any>}
 */
RichPromise.allTimeout = async (promises: Promise<any>[], timeout: number, errorMessages: string[] = []): Promise<any> => {
  const mapPromise = (promise: Promise<any>, i: number) => RichPromise.timeout(promise, timeout, errorMessages[i]);
  const connectionPromises = promises.map(mapPromise);

  return Promise.all(connectionPromises);
};

export = RichPromise;