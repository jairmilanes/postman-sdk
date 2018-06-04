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

var _get2 = require('babel-runtime/helpers/get')

var _get3 = _interopRequireDefault(_get2)

var _inherits2 = require('babel-runtime/helpers/inherits')

var _inherits3 = _interopRequireDefault(_inherits2)

var _operations = require('./operations')

var _operations2 = _interopRequireDefault(_operations)

var _index = require('uuid-by-string/index')

var _index2 = _interopRequireDefault(_index)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @typedef {object} EventProperties
 * @property {string} name The script name
 * @property {string} [listen=prerequest] The event that triggers (prerequest, test)
 * @property {boolean} [disabled=false] A flag indicating if this script is disabled
 * @property {string} [type=text/javascript] The script type eg: text/javascript
 * @property {String[]} [exec=] An array of string commands to be executed
 * @property {string} [source=] The url of the script to be executed eg: http://mysite.com/script.js
 */

/**
 * @typedef {object} Event
 * @property {string} id The event id
 * @property {string} listen The event that triggers [prerequest | test]
 * @property {boolean} disabled A flag indicating if this script is disabled
 * @property {object} script The script object
 * @property {string} script.name The script name
 * @property {string} script.type The script type eg: text/javascript
 * @property {String[]} script.exec An array of string commands to be executed
 * @property {string} script.source The url of the script to be executed eg: http://mysite.com/script.js
 */

/**
 * Events Manager
 * This class should not be used alone, it is part of the CollectionManager Object
 * If you want to add events to a collection or item, please ude the Collection Manager class
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
var EventsManager = (function(_Operations) {
	;(0, _inherits3.default)(EventsManager, _Operations)

	/**
	 * Creates a new EventsManager instance
	 */
	function EventsManager() {
		;(0, _classCallCheck3.default)(this, EventsManager)
		return (0, _possibleConstructorReturn3.default)(
			this,
			(
				EventsManager.__proto__ ||
				(0, _getPrototypeOf2.default)(EventsManager)
			).call(this, 'id')
		)
	}

	/**
	 * Adds a new event to the current collection
	 *
	 * @param {EventProperties} params The event properties
	 * @returns {number} The number of items in the array
	 */

	;(0, _createClass3.default)(EventsManager, [
		{
			key: 'add',
			value: function add(params) {
				var name = params.name,
					listen = params.listen,
					disabled = params.disabled,
					type = params.type,
					exec = params.exec,
					source = params.source

				var event = {
					id: (0, _index2.default)(name),
					listen: listen || 'prerequest',
					disabled: disabled || false,
					script: {
						id: (0, _index2.default)(name),
						type: type || 'text/javascript',
						name: name
					}
				}

				if (!exec && !source) {
					throw new Error(
						'Cannot create an event without a script to run'
					)
				}

				if (exec) {
					event.script.exec = exec
				}

				if (source) {
					event.script.source = source
				}

				return this.array.push(event)
			}

			/**
			 * @returns {object<Event>} Returns the array of Events
			 */
		},
		{
			key: 'toJSON',
			value: function toJSON() {
				return (0, _get3.default)(
					EventsManager.prototype.__proto__ ||
						(0, _getPrototypeOf2.default)(EventsManager.prototype),
					'toJSON',
					this
				).call(this)
			}
		}
	])
	return EventsManager
})(_operations2.default)

exports.default = EventsManager
