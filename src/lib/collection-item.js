import url from 'url'
import header from './header'
import operations from './operations'
import getUuidByString from 'uuid-by-string'
import { itemEvents } from './event'
import queryString from 'query-string'

/**
 * Item constructor
 * @param {object} collection The collection
 * @returns {{
 *      add: function(path:string, method:string),
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
 *    }} The operations object
 */

const item = collection => {
	return {
		add: add(collection),
		addFolder: addFolder(collection.item),
		addToFolder: addToFolder(collection.item),
		...operations(collection.item, 'name')
	}
}

/**
 * AddToFolder constructor
 *
 * @param {object} array The collection object
 * @param {boolean} isFolder If the object is to be a folder or an request item
 * @returns {function(name:string,path:string,method:string)} addToFolder function
 */
const addToFolder = (array, isFolder = false) =>
	/**
	 * Add to folder function
	 *
	 * @param {string} folderName The new item name
	 * @param {string} itemName The path in case of a request item
	 * @param {object} props The properties object
	 * @returns {number} The index of the new item
	 */
	(folderName, itemName, props) => {
		const op = operations(array, 'name')
		const folder = op.find(folderName)

		if (folder) {
			return folder.item.push(
				isFolder ? getFolder(itemName) : getItem(itemName, props)
			)
		}

		throw new Error(`addToFolder: Item named "${name}" could not be found!`)
	}

/**
 * AddFolder constructor
 *
 * @param {array} array The items array
 * @returns {function(*): *} addFolder function
 */
const addFolder = array =>
	/**
	 * Adds an new folder
	 *
	 * @param {string} name The name of the new folder
	 * @param {string} parent The parent folder if any
	 * @returns {number} The index of the new folder
	 */
	(name, parent = null) => {
		if (!parent) {
			return array.push(getFolder(name))
		}

		return addToFolder(array, true)(parent, name)
	}

/**
 * Add a new header
 * @param {object} collection The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (name, props) =>
	collection.item.push(getItem(name, props))

/**
 * Return a folder definition
 *
 * @param {string} name The name of the folder
 * @returns {object} The folder
 */
const getFolder = name => ({
	id: getUuidByString(name),
	name: name,
	item: []
})

/**
 * Checks if a string is an url
 *
 * @param str
 * @returns {boolean}
 */
const isUrl = str => {
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
 * Returns a Item object
 *
 * @param {string} path The path for the request, it can be a full url or just the path
 * @param {string} method The method name
 * @param {object} props The method name
 * @returns {object} The item object
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
			headers: headers || [],
			body: body || {},
			url: {}
		},
		response: response || {},
		event: []
	}

	if (isUrl(path)) {
		const urlObject = url.parse(path)
		item.request.url = {
			path: urlObject.pathname,
			host: urlObject.host,
			protocol: urlObject.protocol.replace(':', ''),
			port: urlObject.port,
			query: queryString.parse(urlObject.query || ''),
			variables: []
		}
	} else {
		item.request.url = {
			path: path,
			host: host,
			protocol: protocol,
			port: port,
			query: query,
			variables: []
		}
	}

	item.id = getUuidByString(method + name)

	return {
		...item,
		...header(item.request.headers),
		...itemEvents(item.event)
	}
}

export default item
