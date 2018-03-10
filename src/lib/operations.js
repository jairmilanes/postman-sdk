import { recursify } from './../helper/util'

/**
 * Creates the collection operations
 * @param {Array} array The collection
 * @returns {
 *    {
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
 *    }
 *  } The operations object
 */
const operations = (array, stringKey = 'name') => ({
	findIndex: findIndex(array, stringKey),
	findWith: findWith(array),
	findBy: findBy(array),
	find: find(array, stringKey),
	has: has(array, stringKey),
	remove: remove(array, stringKey)
})

/**
 * Finds the index of an item
 * @param {array} array The array
 * @param {string} stringKey The name of the key used to return a string representation of the object
 * @returns {function(item:object)} The found index
 */
const findIndex = (array, stringKey = 'name') =>
	/**
	 * @param {object} item
	 * @returns {*}
	 */
	item =>
		array.findIndex(
			value => value[stringKey] === ensureStringValue(item, stringKey)
		)

/**
 * Finds an item constructor
 * @param {array} array The array
 * @returns {function(by:string)} The item
 */
const findBy = array =>
	/**
	 * @param {string} by
	 * @param {string} value
	 * @returns {*}
	 */
	(by, value) => recursify(array, by, value)

/**
 * Finds an item constructor
 *
 * @param {array} array The array
 * @param {string} stringKey The name of the key used to return a string representation of the object
 * @returns {function(by:string)} The item
 */
const find = (array, stringKey = 'name') =>
	/**
	 * Find an item by name
	 *
	 * @param {object|string} name
	 * @returns {*}
	 */
	name => recursify(array, stringKey, ensureStringValue(name, stringKey))

/**
 * FindWith Constructor
 *
 * @param {array} array The array
 * @returns {function} findWith function
 */
const findWith = array =>
	/**
	 * find an item with a custom callback
	 *
	 * @param {function} callback
	 * @returns {object|undefined}
	 */
	callback => array.find(callback)

/**
 * RemoveFrom Constructor
 *
 * @param {array} array The array
 * @param {string} stringKey The name of the key used to return a string representation of the object
 * @returns {function} removeFrom function
 */
const removeFrom = (array, stringKey = 'name') => (name, from) => {
	const found = find(array, stringKey)(from)
	if (found && found.hasOwnProperty('item')) {
		const index = findIndex(found.item, stringKey)(name)
		return index > -1 ? found.item.splice(index, 1) : []
	}
	return []
}

/**
 * Removes an item
 *
 * @param {array} array The array
 * @param {string} stringKey The name of the key used to return a string representation of the object
 * @returns {function} The removed object or false if it was not found
 */
const remove = (array, stringKey = 'name') =>
	/**
	 * @param {object|string} item
	 * @param {object|string} parent
	 * @returns {boolean|object}
	 */
	(item, parent = null) => {
		if (parent) {
			return removeFrom(array, stringKey)(
				ensureStringValue(item, stringKey),
				parent
			)
		}
		const found = findIndex(array, stringKey)(
			ensureStringValue(item, stringKey)
		)
		return found > -1 ? array.splice(found, found + 1) : false
	}

/**
 * Checks if an item exists
 *
 * @param {array} array The array
 * @param {string} stringKey The name of the key used to return a string representation of the object
 * @returns {function({object}): boolean} True or false
 */
const has = (array, stringKey = 'name') =>
	/**
	 * @param {object|string} item
	 * @returns {boolean}
	 */
	item =>
		recursify(array, stringKey, ensureStringValue(item, stringKey)) !== null

/**
 * Ensure's the value is a string
 *
 * @param {object|string} object The object or string with the Key
 * @param {string} key If object, use this key to get the string value
 * @returns {string} The string value
 */
const ensureStringValue = (object, key) =>
	typeof object === 'object' ? object[key] : object

export default operations
