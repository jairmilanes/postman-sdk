import header from './header'
import operations from './operations'
import isUUID from 'is-uuid'
import getUuidByString from 'uuid-by-string'

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
		request: {
			headers: header
		},
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
	 * @param {string} name The new item name
	 * @param {string} path The path in case of a request item
	 * @param {string} method The method name in case of a request item
	 * @returns {number} The index of the new item
	 */
	(name, path, method = null) => {
		const op = operations(array, 'name')
		const folder = op.find(name)

		if (folder) {
			return folder.item.push(
				isFolder ? getFolder(path) : getItem(path, method)
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
const add = collection => (path, method) =>
	collection.item.push(getItem(path, method))

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
 * Returns a Item object
 *
 * @param {string} path The path for the request
 * @param {string} method The method name
 * @returns {object} The item object
 */
const getItem = (path, method) => ({
	id: getUuidByString(method + path),
	name: path,
	request: {
		method: method.toUpperCase(),
		headers: [],
		body: {},
		url: {
			raw: `{{PROTOCOL}}//{{HOST}}:{{PORT}}${path}`,
			path: path,
			host: '{{HOST}}',
			port: '{{PORT}}',
			protocol: '{{PROTOCOL}}',
			query: [],
			variable: []
		}
	},
	response: [],
	event: []
})

export default item
