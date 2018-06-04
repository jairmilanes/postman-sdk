'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of')

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf)

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck')

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require('babel-runtime/helpers/createClass')

var _createClass3 = _interopRequireDefault(_createClass2)

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn')

var _possibleConstructorReturn3 = _interopRequireDefault(
	_possibleConstructorReturn2
)

var _inherits2 = require('babel-runtime/helpers/inherits')

var _inherits3 = _interopRequireDefault(_inherits2)

var _operations = require('./lib/operations')

var _operations2 = _interopRequireDefault(_operations)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @typedef {object} Environment
 * @property {object} environment The required environment key when
 * @property {string} environment.name The environment name
 * @property {object[]} environment.values The environment variable objects
 */

/**
 * @class
 * @classdesc Creates a new environment instance and manage it's variables.
 *
 * You can add & remove keys programmatically so it is easy to integrate into your build scripts and update them during deploys.
 *
 * Variables can be used inside collection items by referencing each variable as {{variable}} in your collection item properties.
 *
 * This environments can then be switched in the Postman SDK allowing to easily test different environments.
 *
 * Use this to create multiple environments instead of creating one collection item per environment.
 *
 * @extends Operations
 */
var EnvironmentManager = (function(_Operations) {
	;(0, _inherits3.default)(EnvironmentManager, _Operations)

	/**
	 * Creates a new EnvironmentManager instance
	 *
	 * @example
	 * const manager = new EnvironmentManager('MY_ENVIRONMENT')
	 *
	 * @param {string} name The environment name
	 * @returns {EnvironmentManager} The environmentManager for your new environment
	 * @override
	 */
	function EnvironmentManager(name) {
		;(0, _classCallCheck3.default)(this, EnvironmentManager)

		var _this = (0, _possibleConstructorReturn3.default)(
			this,
			(
				EnvironmentManager.__proto__ ||
				(0, _getPrototypeOf2.default)(EnvironmentManager)
			).call(this, 'key')
		)

		_this.name = name
		return _this
	}

	/**
	 * Adds a new variable to this environment.
	 * You can either provide a object containing all the properties or pass each one to the method call.
	 *
	 * @example
	 * const manager = new EnvironmentManager('MY_ENVIRONMENT')
	 *
	 * // Use single properties
	 * manager.add('HOST', 'myhost.com', 'string', true)
	 *
	 * // Use property object
	 * manager.add({
	 *    key: 'HOST',
	 *    value: 'myhost.com',
	 *    type: 'string',
	 *    enabled: true
	 * })
	 *
	 * @param {string|object} key The variable name or the variable object. If object is provided, ignore value
	 * @param {string} [value] The variable value, ig object was provided as the first parameter, this can be ignored
	 * @param {string} [type] The variable type (string, number, boolean)
	 * @param {boolean} [enabled] A flag tallying if the variable is enabled or disabled by default
	 * @returns {number}
	 */

	/**
	 * @type {string}
	 * @ignore
	 */

	;(0, _createClass3.default)(EnvironmentManager, [
		{
			key: 'add',
			value: function add(key, value, type, enabled) {
				if (typeof key !== 'string') {
					return this.array.push(key)
				}
				return this.array.push({
					key: key,
					value: value,
					type: type,
					enabled: enabled
				})
			}

			/**
			 * Returns a object representation of the current instance
			 *
			 * @example
			 * const json = manager.toJSON()
			 *
			 * @returns {Environment}
			 * @override
			 */
		},
		{
			key: 'toJSON',
			value: function toJSON() {
				return {
					environment: {
						name: this.name,
						values: this.array.map(function(item) {
							return item
						})
					}
				}
			}
		}
	])
	return EnvironmentManager
})(_operations2.default)

exports.default = EnvironmentManager
