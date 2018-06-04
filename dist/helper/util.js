'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
exports.requestFactory = exports.callbackFactory = exports.getOptions = exports.isUrl = exports.ensureStringValue = exports.recursify = undefined

var _promise = require('babel-runtime/core-js/promise')

var _promise2 = _interopRequireDefault(_promise)

var _assign = require('babel-runtime/core-js/object/assign')

var _assign2 = _interopRequireDefault(_assign)

var _typeof2 = require('babel-runtime/helpers/typeof')

var _typeof3 = _interopRequireDefault(_typeof2)

var _request = require('request')

var _request2 = _interopRequireDefault(_request)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Simple recursive utility
 *
 * @param {array} array The array to look into
 * @param {string} by The key to compare
 * @param {string} value The value to compare
 * @returns {null|*} Null or the value found
 * @ignore
 */
var recursify = (exports.recursify = function recursify(array, by, value) {
	/**
	 * @param {number} index The current index
	 * @returns {null|*} Null or the value found
	 */
	var r = function r(index) {
		if (!array.length) {
			return null
		}

		if (array[index][by] === value) {
			return array[index]
		}

		if (array[index].item instanceof Array && array[index].item.length) {
			var found = recursify(array[index].item, by, value)
			if (found) {
				return found
			}
		}

		if (++index > array.length - 1) {
			return null
		}

		return r(index)
	}

	return r(0)
})

/**
 * Ensure's the value is a string
 *
 * @param {object|string} object The object or string with the Key
 * @param {string} key If object, use this key to get the string value
 * @returns {string} The string value
 * @ignore
 */
var ensureStringValue = (exports.ensureStringValue = function ensureStringValue(
	object,
	key
) {
	return (
		// @todo do a better object type check here
		(typeof object === 'undefined'
			? 'undefined'
			: (0, _typeof3.default)(object)) === 'object'
			? object[key]
			: object
	)
})

/**
 * Checks if a string is an url
 *
 * @param {string} str The string to be tested
 * @returns {boolean} True if it is an url false otherwise
 * @ignore
 */
var isUrl = (exports.isUrl = function isUrl(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // fragment locator
	return pattern.test(str)
})

/**
 * Get the request options
 *
 * @param {string} method The request method
 * @param {string} target The target path
 * @param {object} params The params object
 * @param {*} id The optional request id
 * @param {string} apiKey The Postman Cloud api key
 * @returns {object} The request config
 * @ignore
 */
var getOptions = (exports.getOptions = function getOptions(
	method,
	target,
	params,
	id,
	apiKey
) {
	return {
		baseUrl: 'https://api.getpostman.com/',
		uri: '/' + target + (id ? '/' + id : ''),
		qs: method === 'GET' ? params : {},
		body: method !== 'GET' ? params : {},
		method: method,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			'X-Api-Key': apiKey
		}
	}
})

/**
 * Promise callback
 *
 * @param {function} resolve The resolve callback
 * @param {function} reject The reject callback
 * @returns {function} A Promise callback
 * @ignore
 */
var callbackFactory = (exports.callbackFactory = function callbackFactory(
	resolve,
	reject
) {
	return (
		/**
		 * Request callback
		 *
		 * @param {object} error The error object
		 * @param {object} response The response object
		 * @param {object|Array} body The response body
		 * @returns {object|Array} The response body
		 * @ignore
		 */
		function(error, response, body) {
			if (error) {
				reject(error)
			}

			resolve(body)
		}
	)
})

/**
 * Request factory
 *
 * @param {string} method The method name
 * @param {string} target The request target (eg: collections)
 * @returns {function(id:string,params:object)} The request function
 * @ignore
 */
var requestFactory = (exports.requestFactory = function requestFactory(
	method,
	target,
	apiKey
) {
	/**
	 * Performs a request with an id parameter
	 *
	 * @param {(string|number|object)} [id] The id or the post properties
	 * @param {object} [params={}] The params object
	 * @returns {Promise} A promise
	 * @ignore
	 */
	return function() {
		var id =
			arguments.length > 0 && arguments[0] !== undefined
				? arguments[0]
				: null
		var params =
			arguments.length > 1 && arguments[1] !== undefined
				? arguments[1]
				: {}

		if (method.toLowerCase() === 'post') {
			params = (0, _assign2.default)({}, id)
			id = null
		}

		return new _promise2.default(function(resolve, reject) {
			_request2.default[method.toLowerCase()](
				getOptions(method, target, params, id, apiKey),
				callbackFactory(resolve, reject)
			)
		})
	}
})
