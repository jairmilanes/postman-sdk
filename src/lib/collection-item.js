import header from './header'
import operations from './operations'

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
		...operations(collection.item)
	}
}

/**
 * AddToFolder constructor
 *
 * @param {object} array The collection object
 * @returns {function(name:string,path:string,method:string)} addToFolder function
 */
const addToFolder = array =>
	/**
	 * Add to folder function
	 *
	 * @param {string} name The new item name
	 * @param {string} path The path in case of a request item
	 * @param {string} method The method name in case of a request item
	 * @returns {number} The index of the new item
	 */
	(name, path, method = null) => {
		const found = operations(array).recursiFind('name', name)

		if (found) {
			return found.add(array)(path, method)
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
		const definition = {
			id: name,
			name: `${name.substr(0, 1).toUpperCase() +
				name.substr(1)} Api Endpoints`,
			item: []
		}

		if (!parent) {
			return array.push(definition)
		}

		return addToFolder(array)(parent, name)
	}

/**
 * Add a new header
 * @param {object} collection The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (path, method) => {
	const item = {
		id: path,
		name: `${method.toUpperCase()} ${path}`,
		request: {
			method: method.toUpperCase(),
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
	}

	header(item)
	return collection.item.push(item)
}

export default item
