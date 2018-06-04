'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _typeof2 = require('babel-runtime/helpers/typeof')

var _typeof3 = _interopRequireDefault(_typeof2)

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

var _operations = require('./operations')

var _operations2 = _interopRequireDefault(_operations)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Creates a item request headers array
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
var HeadersManager = (function(_Operations) {
	;(0, _inherits3.default)(HeadersManager, _Operations)

	/**
	 * Creates a new HeadersManager instance
	 */
	function HeadersManager() {
		;(0, _classCallCheck3.default)(this, HeadersManager)
		return (0, _possibleConstructorReturn3.default)(
			this,
			(
				HeadersManager.__proto__ ||
				(0, _getPrototypeOf2.default)(HeadersManager)
			).call(this, 'key')
		)
	}

	/**
	 * Add a new header
	 *
	 * @param {string|object} key The header name or the header object
	 * @param {string} value The header value
	 * @returns {number} The number of items in the array
	 */

	;(0, _createClass3.default)(HeadersManager, [
		{
			key: 'add',
			value: function add(key, value) {
				if (
					(typeof key === 'undefined'
						? 'undefined'
						: (0, _typeof3.default)(key)) === 'object'
				) {
					return this.array.push({
						key: key.key,
						value: key.value
					})
				}

				return this.array.push({
					key: key,
					value: value
				})
			}
		}
	])
	return HeadersManager
})(_operations2.default)

exports.default = HeadersManager
