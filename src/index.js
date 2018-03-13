import client from 'request'
import collection from './lib/collection'
import environment from './lib/environment'

if (process.env.NODE_ENV !== 'test' && !process.env.POSTMAN_API_KEY) {
	throw new Error('Postman SDK: POSTMAN_API_KEY anv variable not found!')
}

/**
 * Get the request options
 *
 * @param {string} method The request method
 * @param {string} target The target path
 * @param {object} params The params object
 * @param {*} id The optional request id
 * @returns {object} The request config
 */
const getOptions = (method, target, params, id) => ({
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
})

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
			reject(error)
		}

		resolve(body)
	}

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
			params = Object.assign({}, id)
			id = null
		}

		return new Promise((resolve, reject) => {
			client[method.toLowerCase()](
				getOptions(method, target, params, id),
				callbackFactory(resolve, reject)
			)
		})
	}
}

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
	requestFactory('POST', target)

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
	requestFactory('GET', target)

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
	requestFactory('PUT', target)

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
	requestFactory('DELETE', target)

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
})

export const Collections = getMethods('collections')
export const Environments = getMethods('environments')
export const Mocks = getMethods('mocks')
export const Monitors = getMethods('monitors')
export const User = getMethods('user')
export const Builder = { collection, environment }
