'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck')

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require('babel-runtime/helpers/createClass')

var _createClass3 = _interopRequireDefault(_createClass2)

var _util = require('./../helper/util')

var _lodash = require('lodash.clonedeep')

var _lodash2 = _interopRequireDefault(_lodash)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Operations
 * @ignore
 */
var Operations = (function() {
	/**
	 * Creates a new Operations instance
	 *
	 * @param {string} key The key which to identify each object in the array
	 * @param {object[]} [array=] An array with objects to preload
	 */

	/**
	 * The key which to identify an object in the array
	 * @ignore
	 */
	function Operations(key, array) {
		;(0, _classCallCheck3.default)(this, Operations)

		this.key = key
		this.array = array || []
	}
	/**
	 * Find's an object's index in the list using the default identifier
	 *
	 * @example
	 * // Look for an object using a value
	 * const index = manager.findIndex('VALUE')
	 * // Will log the variable index inside the variables array
	 * console.log(index)
	 *
	 * // Look for an object using an object with the key identifier
	 * const index = manager.findIndex({name: 'VALUE'})
	 * // Will log the variable index inside the variables array
	 * console.log(index)
	 *
	 * @param {string|object} identifier The item identifier value or an object containing the identifier key
	 * @param {object[]} [array=] An alternative array to look for the index in. This is mostly used by the .remove in order to find the objects inside folders (or parents)
	 * @returns {number} The found item index or -1
	 */

	/**
	 * The array containing the objects
	 * @ignore
	 */

	;(0, _createClass3.default)(Operations, [
		{
			key: 'findIndex',
			value: function findIndex(identifier, array) {
				var _this = this

				return (array || this.array).findIndex(function(value) {
					return (
						value[_this.key] ===
						(0, _util.ensureStringValue)(identifier, _this.key)
					)
				})
			}

			/**
			 * Finds an object using a callback function
			 *
			 * @example
			 * const index = manager.findWith((resource) => resource.property === 'variable_value')
			 *
			 * // Will log the found variable object
			 * console.log(variable)
			 *
			 * @param {function} callback The callback function to call for each item, this function should return true if you found the item and false otherwise
			 * @returns {object} The found resource
			 */
		},
		{
			key: 'findWith',
			value: function findWith(callback) {
				return this.array.find(callback)
			}

			/**
			 * Find's the first object by the object key of your choice
			 *
			 * @example
			 * const resource = manager.findBy('property_name', false)
			 *
			 * // Will log the found object
			 * console.log(resource)
			 *
			 * @param {string} by The key to look for in the item
			 * @param {string} value The value of the key
			 * @returns {object|null} The found object or null
			 */
		},
		{
			key: 'findBy',
			value: function findBy(by, value) {
				return (0, _util.recursify)(this.array, by, value)
			}

			/**
			 * Finds an object using the default identifier
			 *
			 * @example
			 * const resource = manager.find('VALUE')
			 *
			 * // Will log the found object
			 * console.log(resource)
			 *
			 * @param {string|object} identifier The item identifier value or an object containing the identifier key
			 * @returns {object|null} The found item object or null
			 */
		},
		{
			key: 'find',
			value: function find(identifier) {
				return (0, _util.recursify)(
					this.array,
					this.key,
					(0, _util.ensureStringValue)(identifier, this.key)
				)
			}

			/**
			 * Checks if an object exists
			 *
			 * @example
			 * const exists = manager.has('VALUE')
			 *
			 * // Will log true if it finds the resource or false otherwise
			 * console.log(exists)
			 *
			 * @param {string|object} identifier The item identifier value or an object containing the identifier key
			 * @returns {boolean} True if the item exists fails otherwise
			 */
		},
		{
			key: 'has',
			value: function has(identifier) {
				return (
					(0, _util.recursify)(
						this.array,
						this.key,
						(0, _util.ensureStringValue)(identifier, this.key)
					) !== null
				)
			}

			/**
			 * Removes an object from an specific folder
			 *
			 * @example
			 * const exists = manager.removeFrom('VALUE')
			 *
			 * // Will log true if it finds the resource or false otherwise
			 * console.log(exists)
			 *
			 * @param {string} identifier The item identifier
			 * @param {(string|null)} from The folder name
			 * @returns {object}
			 */
		},
		{
			key: 'removeFrom',
			value: function removeFrom(identifier, from) {
				var found = this.find(from)
				if (found && found.hasOwnProperty('item')) {
					var index = this.findIndex(identifier, found.item)
					return index > -1 ? found.item.splice(index, 1) : []
				}
				return []
			}

			/**
			 * Removes an object from the list
			 *
			 * @param {string|object} identifier The item identifier value or an object containing the identifier key
			 * @param {string} [parent] The item parent identifier value
			 */
		},
		{
			key: 'remove',
			value: function remove(identifier, parent) {
				if (parent) {
					return this.removeFrom(identifier, parent)
				}
				var found = this.findIndex(identifier)
				return found > -1 ? this.array.splice(found, 1) : null
			}

			/**
			 * Returns a object representation of the current instance
			 *
			 * @returns {*} The array of objects
			 */
		},
		{
			key: 'toJSON',
			value: function toJSON() {
				return (0, _lodash2.default)(this.array)
			}
		}
	])
	return Operations
})()

exports.default = Operations
