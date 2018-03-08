'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _collection = require('./lib/collection');

var _collection2 = _interopRequireDefault(_collection);

var _environment = require('./lib/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the request options
 *
 * @param {string} method The request method
 * @param {string} target The target path
 * @param {object} params The params object
 * @param {*} id The optional request id
 * @returns {object} The request config
 */
const getOptions = (method, target, params, id) => {
	return {
		baseUrl: 'https://api.getpostman.com/',
		uri: `/${target}${id ? `/${id}` : ''}`,
		qs: method === 'GET' ? params : {},
		body: method !== 'GET' ? params : {},
		method,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'X-Api-Key': process.env.POSTMAN_API_KEY
		}
	};
};

/**
 * Promise callback
 *
 * @param {function} resolve The resolve callback
 * @param {function} reject The reject callback
 * @returns {function} A Promise callback
 */
const callbackFactory = (resolve, reject) =>
/**
 * Request callback
 *
 * @param {object} error The error object
 * @param {object} response The response object
 * @param {object|Array} body The response body
 * @returns {object|Array} The response body
 */
(error, response, body) => {
	if (error) {
		reject(error);
	}

	resolve(body);
};

/**
 * Request factory
 *
 * @param {string} method The method name
 * @param {string} target The request target (eg: collections)
 * @returns {function(id:string,params:object)} The request function
 */
const requestFactory = (method, target) => {
	/**
  * Performs a request with an id parameter
  *
  * @param {*} id The optional request id
  * @param {object} params The params object
  * @returns {Promise} A promise
  */
	return (id = null, params = {}) => {
		if (method.toLowerCase() === 'post') {
			params = (0, _assign2.default)({}, id);
			id = null;
		}

		return new _promise2.default((resolve, reject) => {
			_request2.default[method.toLowerCase()](getOptions(method, target, params, id), callbackFactory(resolve, reject));
		});
	};
};

/**
 * Prepares a post method
 *
 * @param {string} target The call target
 * @returns {function} The request method
 */
const _post = target =>
/**
 * Performs a post request
 *
 * @param {*} id The optional request id
 * @param {object} params The params object
 * @returns {Promise} A promise
 */
requestFactory('POST', target);

/**
 * Prepares a post method
 *
 * @param {string} target The call target
 * @returns {function} The request method
 * @private
 */
const _get = target =>
/**
 * Performs a get request
 *
 * @param {*} id The optional request id
 * @param {object} params The params object
 * @returns {Promise} A promise
 */
requestFactory('GET', target);

/**
 * Prepares a post method
 *
 * @param {string} target The call target
 * @returns {function} The request method
 * @private
 */
const _put = target =>
/**
 * Performs a put request
 *
 * @param {*} id The optional request id
 * @param {object} params The params object
 * @returns {Promise} A promise
 */
requestFactory('PUT', target);

/**
 * Prepares a post method
 *
 * @param {string} target The call target
 * @returns {function} The request method
 * @private
 */
const _destroy = target =>
/**
 * Performs a delete request
 *
 * @param {*} id The optional request id
 * @param {object} params The params object
 * @returns {Promise} A promise
 */
requestFactory('DELETE', target);

/**
 * Get's all possible methods for a target
 *
 * @param {string} target The target name (eg: collections)
 * @returns {{get: function, post: function, put: function, destroy: function}} The methods object
 */
const getMethods = target => ({
	get: _get(target),
	post: _post(target),
	put: _put(target),
	destroy: _destroy(target)
});

exports.default = {
	Collections: getMethods('collections'),
	Environments: getMethods('environments'),
	Mocks: getMethods('mocks'),
	Monitors: getMethods('monitors'),
	User: getMethods('user'),
	Builder: { collection: _collection2.default, environment: _environment2.default }
};