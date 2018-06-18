import { requestFactory } from './helper/util'
import debug from 'debug'

const log = debug('postman-sdk:client')

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
export default class Client {
	/**
	 * The api target
	 * @type {string}
	 * @ignore
	 */
	target

	/**
	 * The api key
	 * @type {string}
	 * @ignore
	 */
	apiKey

	/**
	 * Create a new Api Instance
	 *
	 * @param {string} target One of [collections, environments, mocks, monitors, user]
	 * @param {string} [apiKey=] The Postman Cloud api key
	 */
	constructor(target, apiKey) {
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
	get(id) {
		return requestFactory('GET', this.target, this.apiKey)(id)
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
	post(props) {
		return requestFactory('POST', this.target, this.apiKey)(props)
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
	put(id, props) {
		return requestFactory('PUT', this.target, this.apiKey)(id, props)
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
	delete(id) {
		return requestFactory('DELETE', this.target, this.apiKey)(id)
	}
}
