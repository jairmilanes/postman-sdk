import recursify from './../helper/util'
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
const operations = array => ({
	findIndex: findIndex(array),
	findWith: findWith(array),
	findBy: findBy(array),
	find: find(array),
	recursiFind: recursiFind(array),
	has: has(array),
	remove: remove(array)
})

/**
 * Finds the index of an item
 * @param {array} array The array
 * @returns {function(item:object)} The found index
 */
const findIndex = array =>
	/**
	 * @param {object} item
	 * @returns {*}
	 */
	item =>
		array.findIndex(
			value => (value.name = item.name) || (value.id = item.id)
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
	(by, value) => array.find(item => item[by] === value)

/**
 * Finds an item constructor
 * @param {array} array The array
 * @returns {function(by:string)} The item
 */
const find = array =>
	/**
	 * @param {string} name
	 * @returns {*}
	 */
	name => array.find(item => item.name === name)

/**
 * Finds a item by name recursivel
 *
 * @param {array} array the array of items
 * @returns {function(name:string): null|object} Null if item not found, item object otherwise
 */
const recursiFind = array => (by, value) => recursify(array, by, value)

/**
 * Finds an item with a custom callback
 * @param {array} array The array
 * @returns {function} The item
 */
const findWith = array =>
	/**
	 * @param {function} callback
	 * @returns {object}
	 */
	callback => array.find(callback)

/**
 * Removes an item
 * @param {array} array The array
 * @returns {function({object}): boolean|object} The removed object or false if it was not found
 */
const remove = array =>
	/**
	 * @param {object} item
	 * @returns {boolean|object}
	 */
	item => {
		const found = findIndex(array)(item)
		return found > -1 ? array.slice(found, found + 1) : false
	}

/**
 * Checks if an item exists
 * @param {array} array The array
 * @returns {function({object}): boolean} True or false
 */
const has = array =>
	/**
	 * @param {object} item
	 * @returns {boolean}
	 */
	item => findIndex(array)(item) > -1

export default operations
