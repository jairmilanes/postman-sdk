import client from 'request'
import debug from 'debug'

const log = debug('postman-sdk:request')

/**
 * Simple recursive utility
 *
 * @param {array} array The array to look into
 * @param {string} by The key to compare
 * @param {string} value The value to compare
 * @returns {null|*} Null or the value found
 * @ignore
 */
export const recursify = (array, by, value) => {
	/**
	 * @param {number} index The current index
	 * @returns {null|*} Null or the value found
	 */
	const r = index => {
		if (!array.length) {
			return null
		}

		if (array[index][by] === value) {
			return array[index]
		}

		if (array[index].item instanceof Array && array[index].item.length) {
			const found = recursify(array[index].item, by, value)
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
}

/**
 * Ensure's the value is a string
 *
 * @param {object|string} object The object or string with the Key
 * @param {string} key If object, use this key to get the string value
 * @returns {string} The string value
 * @ignore
 */
export const ensureStringValue = (object, key) =>
	// @todo do a better object type check here
	typeof object === 'object' ? object[key] : object

/**
 * Checks if a string is an url
 *
 * @param {string} str The string to be tested
 * @returns {boolean} True if it is an url false otherwise
 * @ignore
 */
export const isUrl = str => {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // fragment locator
	return pattern.test(str)
}

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
export const getOptions = (method, target, params, id, apiKey) => ({
	baseUrl: 'https://api.getpostman.com/',
	uri: `/${target}${id ? `/${id}` : ''}`,
	qs: method === 'GET' ? params : {},
	body: method !== 'GET' ? params : {},
	method,
	json: true,
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Key': apiKey
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
export const callbackFactory = (resolve, reject) =>
	/**
	 * Request callback
	 *
	 * @param {object} error The error object
	 * @param {object} response The response object
	 * @param {object|Array} body The response body
	 * @returns {object|Array} The response body
	 * @ignore
	 */
	(error, response, body) => {
		log(
			'----request:complete %s',
			JSON.stringify(error),
			JSON.stringify(body)
		)
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
 * @ignore
 */
export const requestFactory = (method, target, apiKey) => {
	/**
	 * Performs a request with an id parameter
	 *
	 * @param {(string|number|object)} [id] The id or the post properties
	 * @param {object} [params={}] The params object
	 * @returns {Promise} A promise
	 * @ignore
	 */
	return (id = null, params = {}) => {
		if (method.toLowerCase() === 'post') {
			params = Object.assign({}, id)
			id = null
		}

		const options = getOptions(method, target, params, id, apiKey)

		log('----request:%s %s', method, JSON.stringify(options))

		return new Promise((resolve, reject) => {
			client[method.toLowerCase()](
				options,
				callbackFactory(resolve, reject)
			)
		})
	}
}
