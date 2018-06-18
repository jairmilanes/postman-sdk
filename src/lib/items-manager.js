import url from 'url'
import cloneDeep from 'lodash.clonedeep'
import HeadersManager from './headers-manager'
import Operations from './operations'
import getUuidByString from 'uuid-by-string'
import EventsManager from './events-manager'
import queryString from 'query-string'
import { isUrl } from '../helper/util'

/**
 * @typedef {object} ItemProperties
 * @property {string} path The request path. Can be a full url, which will be parsed or just the pathname eg:/users
 * @property {string} method The request method eg: POST, GET, PUT
 * @property {string} [host=] The request host
 * @property {string} [headers=[]] The request headers object
 * @property {string} [protocol=http] The request protocol
 * @property {string} [port=] The request port number eg: 3000
 * @property {string} [query={}] The query object to append to the path
 * @property {string} [body={}] The request body
 * @property {string} [response={}] The response object
 */

/**
 * @typedef {object} Item
 * @property {string} id The request id
 * @property {string} name The request item name
 * @property {object} request The request object
 * @property {string} request.method The request method (eg: POST, GET, PUT...)
 * @property {object[]} request.headers The request headers array
 * @property {object} request.body The request data to be sent to the server
 * @property {object} request.url The url object
 * @property {string} request.url.path The request path, it can be the pathname only, or the full url in which case you only need to also provide the method.
 * @property {string} request.url.host The request host, if a full url was provided under the path property, this can be ignored
 * @property {string} request.url.protocol The request protocol (http or https)
 * @property {number} request.url.port The request port (eg: 3000)
 * @property {number} request.url.query The query parameters to be sent in case of GET requests (eg: {uid: '[uid]'})
 * @property {object[]} request.url.variables The request variables
 * @property {object[]} response The response array
 * @property {Event[]} event The request protocol
 */

/**
 * Collection Item Class
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
class ItemsManager extends Operations {
	/**
	 * Creates a new CollectionItemManager instance
	 */
	constructor() {
		super('name')
	}

	/**
	 * Adds a new item to the collection
	 *
	 * @param {string} name The item name
	 * @param {ItemProperties} props The item properties
	 * @returns {number} The number of items in the array
	 */
	add(name, props) {
		return this.array.push(getItem(name, props))
	}

	/**
	 * Adds a new item to a folder
	 *
	 * @param {string} folderName The new item name
	 * @param {string} itemName The path in case of a request item
	 * @param {object} [props] The properties Item object or null, in which case a folder will be created
	 * @returns {number} The index of the new item
	 */
	addToFolder(folderName, itemName, props) {
		const folder = this.find(folderName)

		if (folder) {
			return folder.item.push(
				!props ? getFolder(itemName) : getItem(itemName, props)
			)
		}

		throw new Error(`addToFolder: Item named "${name}" could not be found!`)
	}

	/**
	 * Adds a new folder
	 *
	 * @param {string} name The name of the new folder
	 * @param {string} [parent] The parent folder if any
	 * @returns {number} The index of the new folder
	 */
	addFolder(name, parent) {
		if (!parent) {
			return this.array.push(getFolder(name))
		}
		return this.addToFolder(parent, name)
	}

	/**
	 * Returns the object representation fo the instance
	 *
	 * @returns {object<Item>} The request items array
	 */
	toJSON() {
		const convert = array => {
			return array.map(item => {
				if (!item.request) {
					item.item = convert(item.item)
					return item
				}

				const clone = cloneDeep(item)

				if (clone.event instanceof EventsManager) {
					clone.event = clone.event.toJSON()
				}

				if (clone.request.header instanceof HeadersManager) {
					clone.request.header = clone.request.header.toJSON()
				}

				return clone
			})
		}

		return convert(this.array)
	}
}

/**
 * Return a folder definition
 *
 * @param {string} name The name of the folder
 * @returns {object} The folder
 * @ignore
 */
const getFolder = name => ({
	id: getUuidByString(name),
	name: name,
	item: []
})

/**
 * Returns a Item object
 *
 * @param {string} name The item name. Used to generate it's it and in searches
 * @param {object} props The method name
 * @returns {Item} The item object
 * @ignore
 */
const getItem = (name, props) => {
	const {
		path,
		method,
		headers,
		protocol,
		host,
		port,
		query,
		body,
		response
	} =
		props || {}

	const item = {
		name: name,
		request: {
			method: (method || 'get').toUpperCase(),
			header: new HeadersManager(headers),
			body: body || {},
			url: {}
		},
		response: response || []
	}

	if (isUrl(path)) {
		const urlObject = url.parse(path)
		item.request.url = {
			path: urlObject.pathname,
			host: urlObject.hostname,
			protocol: urlObject.protocol.replace(':', ''),
			port: urlObject.port,
			query: queryString.parse(urlObject.query || ''),
			variable: []
		}
	} else {
		item.request.url = {
			path: path,
			host: host,
			protocol: protocol || 'http',
			port: port,
			query: query || [],
			variable: []
		}
	}

	item.id = getUuidByString(method + name)

	item.event = new EventsManager()

	return item
}

export default ItemsManager
