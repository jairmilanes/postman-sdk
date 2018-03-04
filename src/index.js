import client from "request";

/**
 * Get the request options
 *
 * @param {String} method The request method
 * @param {String} target The target path
 * @param {Object} params The params object
 * @param {*} id The optional request id
 * @returns {{host: string, method: string}} The request config
 */
const getOptions = (method, target, params, id) => ({
  url: `/${target}${id ? `/${id}` : ""}`,
  qs: method === "GET" ? params : {},
  body: method !== "GET" ? params : {},
  method,
  baseUrl: "https://api.getpostman.com/",
  json: true,
  headers: {
    "X-Api-Key": process.env.POSTMAN_API_KEY
  }
});

/**
 * Promise callback
 *
 * @param {Function} resolve The resolve callback
 * @param {Function} reject The reject callback
 * @returns {Function} A Promise callback
 */
const callbackFactory = (resolve, reject) => {
  /**
   * Request callback
   *
   * @param {Object} error The error object
   * @param {Object} response The response object
   * @param {Object|Array} body The response body
   * @returns {Object|Array} The response body
   */
  const callback = (error, response, body) => {
    if (error) {
      reject(error);
    }

    resolve(body);
  };

  return callback;
};

/**
 * Creates a request with id
 *
 * @param {String} method The method name
 * @param {String} target The request target (eg: collections)
 * @returns {Function} The request function
 */
const call = (method, target) => {
  /**
   * Performs a request with an id parameter
   *
   * @param {*} id The optional request id
   * @param {Object} params The params object
   * @returns {Promise<any>} A promise
   */
  return (id = null, params = {}) =>
    new Promise((resolve, reject) => {
      client[method.toLowerCase()](
        getOptions(method, target, params, id),
        callbackFactory(resolve, reject)
      );
    });
};

/**
 * Prepares a post method
 *
 * @param {String} target The call target
 * @returns {Function} The request method
 * @private
 */
const _post = target =>
  /**
   * Performs a post request
   *
   * @param {Object} params The params object
   * @param {*} id The optional request id
   * @returns {Promise<any>} A promise
   */
  call("POST", target);

/**
 * Prepares a post method
 *
 * @param {String} target The call target
 * @returns {Function} The request method
 * @private
 */
const _get = target =>
  /**
   * Performs a get request
   *
   * @param {Object} params The params object
   * @param {*} id The optional request id
   * @returns {Promise<any>} A promise
   */
  call("GET", target);

/**
 * Prepares a post method
 *
 * @param {String} target The call target
 * @returns {Function} The request method
 * @private
 */
const _put = target =>
  /**
   * Performs a put request
   *
   * @param {Object} params The params object
   * @param {*} id The optional request id
   * @returns {Promise<any>} A promise
   */
  call("PUT", target);

/**
 * Prepares a post method
 *
 * @param {String} target The call target
 * @returns {Function} The request method
 * @private
 */
const _destroy = target =>
  /**
   * Performs a delete request
   *
   * @param {Object} params The params object
   * @param {*} id The optional request id
   * @returns {Promise<any>} A promise
   */
  call("DELETE", target);

/**
 * Get's all possible methods for a target
 *
 * @param {String} target The target name (eg: collections)
 * @returns {{get: Function, post: Function, put: Function, destroy: Function}} The methods object
 */
const getMethods = target => ({
  get: _get(target),
  post: _post(target),
  put: _put(target),
  destroy: _destroy(target)
});

export default {
  Collections: getMethods("collections"),
  Environments: getMethods("environments"),
  Mocks: getMethods("mocks"),
  Monitors: getMethods("monitors"),
  User: getMethods("user")
};
