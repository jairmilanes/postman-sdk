'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck')

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require('babel-runtime/helpers/createClass')

var _createClass3 = _interopRequireDefault(_createClass2)

var _util = require('./helper/util')

var _debug = require('debug')

var _debug2 = _interopRequireDefault(_debug)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var log = (0, _debug2.default)('postman-sdk:client')

/**
 * A promise based REST api client to interact with Postman Cloud servers to create and update your collections, environments, mocks & monitors.
 * <br><br>
 * **For detailed response & payload formats visit the** [official REST api documentation page](https://docs.api.getpostman.com):
 *
 * @example
 * // Create a client instance
 * const client = new Client('collections', '[YOUR_API_KEY]') // use if of [collections, environments, mocks, monitors, user]
 *
 * //  Lets use a collection as an example here
 * const collection = new CollectionManager('My Collection', '1.0.0')
 *
 * // Add a couple of items to the collection
 * collection.add('endpoint-one', {
 *      path: 'http://myhost.com/endpoint-one',
 *      method: 'get'
 * })
 *
 * collection.add('endpoint-two', {
 *      path: 'http://myhost.com/endpoint-two',
 *      method: 'post'
 * })
 *
 * const collectionId;
 *
 * // Post your collections to the Postman servers
 * client.post(collection.toJSON())
 *      .then(response => collectionId = response.collection.id)
 *      .catch(error => console.error(error))
 *
 * // You can later retrieve your created collections if needed
 * client.get(collectionId).then(collections => console.log(collections))
 *
 * collection.add('endpoint-three', {
 *      path: 'http://myhost.com/endpoint-three',
 *      method: 'get'
 * })
 *
 * // You can also update them if needed
 * client.put(collectionId, collection.toJSON())
 *      .then(response => console.log(response))
 */

var Client = (function() {
	/**
	 * Create a new Api Instance
	 *
	 * @param {string} target One of [collections, environments, mocks, monitors, user]
	 * @param {string} [apiKey=] The Postman Cloud api key
	 */

	/**
	 * The api target
	 * @type {string}
	 * @ignore
	 */
	function Client(target, apiKey) {
		;(0, _classCallCheck3.default)(this, Client)

		this.target = target
		this.apiKey = apiKey || process.env.POSTMAN_API_KEY

		if (!this.apiKey) {
			throw new Error(
				'You must provide an api key in order to make requests ti the Postman Cloud. Either provide it as a parameter to this client or set the POSTMAN_API_KEY environment variable.'
			)
		}

		log('client:ready %s|%s', target, this.apiKey)
	}

	/**
	 * Get a resource from the server
	 *
	 *
	 * @argument {string|number|object} [id] The id or the get params
	 * @returns {Promise<object>}
	 *
	 * @example
	 * // Get a single resource from the server
	 * Client.get([resource-id]).then( results => {
	 *     console.log(results)
	 * })
	 *
	 * // Get a all resources from the server
	 * Client.get().then( results => {
	 *     console.log(results)
	 * })
	 */

	/**
	 * The api key
	 * @type {string}
	 * @ignore
	 */

	;(0, _createClass3.default)(Client, [
		{
			key: 'get',
			value: function get(id) {
				return (0, _util.requestFactory)(
					'GET',
					this.target,
					this.apiKey
				)(id)
			}

			/**
			 * Post a new resource to the server
			 *
			 * @param {object} props The post properties
			 * @returns {Promise<object>}
			 *
			 * @example
			 * // Get a single resource from the server
			 * Client.post([props]).then( results => {
			 *     console.log(results)
			 * })
			 *
			 * // or using async/await you could do
			 * const results = await Client.post([props])
			 * console.log(results)
			 */
		},
		{
			key: 'post',
			value: function post(props) {
				return (0, _util.requestFactory)(
					'POST',
					this.target,
					this.apiKey
				)(props)
			}

			/**
			 * Updates a resource in the server
			 *
			 * @param {string|number} id The resource id
			 * @param {object} [props={}] The resource properties to update
			 * @returns {Promise<object>}
			 *
			 * @example
			 * // Get a single resource from the server
			 * Client.put([id], [props]).then( results => {
			 *     console.log(results)
			 * })
			 *
			 * // or using async/await you could do
			 * const results = await Client.put([id], [props])
			 * console.log(results)
			 */
		},
		{
			key: 'put',
			value: function put(id, props) {
				return (0, _util.requestFactory)(
					'PUT',
					this.target,
					this.apiKey
				)(id, props)
			}

			/**
			 * Deletes a resource from the server
			 *
			 * @param {string|number} id The resource id
			 * @returns {Promise<object>}
			 *
			 * @example
			 * // Get a single resource from the server
			 * Client.delete([id]).then( results => {
			 *     console.log(results)
			 * })
			 *
			 * // or using async/await you could do
			 * const results = await Client.delete()
			 * console.log(results)
			 */
		},
		{
			key: 'delete',
			value: function _delete(id) {
				return (0, _util.requestFactory)(
					'DELETE',
					this.target,
					this.apiKey
				)(id)
			}
		}
	])
	return Client
})()

exports.default = Client
