'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _typeof2 = require('babel-runtime/helpers/typeof')

var _typeof3 = _interopRequireDefault(_typeof2)

var _util = require('./../helper/util')

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Operations
 *
 * @param {array} array The collection to manage
 * @param {string} stringKey The key to which find items by
 * @returns {{findIndex: Function, findWith: (function(Function)), findBy: Function, find: Function, has: Function, remove: Function}}
 */
var operations = function operations(array) {
	var stringKey =
		arguments.length > 1 && arguments[1] !== undefined
			? arguments[1]
			: 'name'

	var o = {}

	/**
	 * Find's an item's index in the list
	 *
	 * @param {string} identifier The item identifier value
	 * @param {object[]} target The list to perform the search on, if not provided the default list will be used
	 * @returns {number} The found item index or -1
	 */
	o.findIndex = function(identifier) {
		var target =
			arguments.length > 1 && arguments[1] !== undefined
				? arguments[1]
				: null
		return (target || array).findIndex(function(value) {
			return value[stringKey] === ensureStringValue(identifier, stringKey)
		})
	}

	/**
	 * Finds an item using a callback function
	 *
	 * @param {function} callback The callback function to call for each item, this function should return true if you found the item and false otherwise
	 */
	o.findWith = function(callback) {
		return array.find(callback)
	}

	/**
	 * Find's an item by one of the item keys of your choice
	 *
	 * @param {string} by The key to look for in the item
	 * @param {string} value The value of the key
	 * @returns {object|null} The found object or null
	 */
	o.findBy = function(by, value) {
		return (0, _util.recursify)(array, by, value)
	}

	/**
	 * Finds an item by the name
	 *
	 * @params {string} identifier The search identifier (eg: name, id)
	 * @returns {object} The found item object or null
	 */
	o.find = function(identifier) {
		return (0, _util.recursify)(
			array,
			stringKey,
			ensureStringValue(identifier, stringKey)
		)
	}

	/**
	 * Checks if an item exists
	 *
	 * @param {string} identifier The item name
	 * @returns {object} True if the item exists fails otherwise
	 */
	o.has = function(identifier) {
		return (
			(0, _util.recursify)(
				array,
				stringKey,
				ensureStringValue(identifier, stringKey)
			) !== null
		)
	}

	/**
	 * Removes an item from an specific folder
	 *
	 * @param {string} identifier The item identifier
	 * @param {string|null} from The folder name
	 * @returns {*}
	 */
	o.removeFrom = function(identifier, from) {
		var found = o.find(from)
		if (found && found.hasOwnProperty('item')) {
			var index = o.findIndex(identifier, found.item)
			return index > -1 ? found.item.splice(index, 1) : []
		}
		return []
	}

	/**
	 * Removes an item from the list
	 *
	 * @param {string} identifier The item identifier
	 * @param {string|null} parent The item identifier
	 */
	o.remove = function(identifier) {
		var parent =
			arguments.length > 1 && arguments[1] !== undefined
				? arguments[1]
				: null

		if (parent) {
			return o.removeFrom(
				ensureStringValue(identifier, stringKey),
				parent
			)
		}
		var found = o.findIndex(ensureStringValue(identifier, stringKey))
		var results = found > -1 ? array.splice(found, 1) : null
		console.log('FOUND', identifier, found, results)
		return results
	}

	return o
}

/**
 * Ensure's the value is a string
 *
 * @param {object|string} object The object or string with the Key
 * @param {string} key If object, use this key to get the string value
 * @returns {string} The string value
 */
var ensureStringValue = function ensureStringValue(object, key) {
	return (
		// @todo do a better object type check here
		(typeof object === 'undefined'
			? 'undefined'
			: (0, _typeof3.default)(object)) === 'object'
			? object[key]
			: object
	)
}

exports.default = operations
