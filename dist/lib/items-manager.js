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

var _url = require('url')

var _url2 = _interopRequireDefault(_url)

var _lodash = require('lodash.clonedeep')

var _lodash2 = _interopRequireDefault(_lodash)

var _headersManager = require('./headers-manager')

var _headersManager2 = _interopRequireDefault(_headersManager)

var _operations = require('./operations')

var _operations2 = _interopRequireDefault(_operations)

var _uuidByString = require('uuid-by-string')

var _uuidByString2 = _interopRequireDefault(_uuidByString)

var _eventsManager = require('./events-manager')

var _eventsManager2 = _interopRequireDefault(_eventsManager)

var _queryString = require('query-string')

var _queryString2 = _interopRequireDefault(_queryString)

var _util = require('../helper/util')

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @typedef {object} ItemProperties
 * @property {string} path The request path. Can be a full url, which will be parsed or just the pathname eg:/users
 * @property {string} method The request method eg: POST, GET, PUT
 * @property {string} [host=] The request host
 * @property {string} [headers=[]] The request headers object
 * @property {string} [protocol=http] The request protocol
 * @property {string} [port=] The request port number eg: 3000
 * @property {string} [query={}] The query object to append to the path
 * @property {string} [body={}] The request body
 * @property {string} [response={}] The response object
 */

/**
 * @typedef {object} Item
 * @property {string} id The request id
 * @property {string} name The request item name
 * @property {object} request The request object
 * @property {string} request.method The request method (eg: POST, GET, PUT...)
 * @property {object[]} request.headers The request headers array
 * @property {object} request.body The request data to be sent to the server
 * @property {object} request.url The url object
 * @property {string} request.url.path The request path, it can be the pathname only, or the full url in which case you only need to also provide the method.
 * @property {string} request.url.host The request host, if a full url was provided under the path property, this can be ignored
 * @property {string} request.url.protocol The request protocol (http or https)
 * @property {number} request.url.port The request port (eg: 3000)
 * @property {number} request.url.query The query parameters to be sent in case of GET requests (eg: {uid: '[uid]'})
 * @property {object[]} request.url.variables The request variables
 * @property {object[]} response The response array
 * @property {Event[]} event The request protocol
 */

/**
 * Collection Item Class
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
var ItemsManager = (function(_Operations) {
	;(0, _inherits3.default)(ItemsManager, _Operations)

	/**
	 * Creates a new CollectionItemManager instance
	 */
	function ItemsManager() {
		;(0, _classCallCheck3.default)(this, ItemsManager)
		return (0, _possibleConstructorReturn3.default)(
			this,
			(
				ItemsManager.__proto__ ||
				(0, _getPrototypeOf2.default)(ItemsManager)
			).call(this, 'name')
		)
	}

	/**
	 * Adds a new item to the collection
	 *
	 * @param {string} name The item name
	 * @param {ItemProperties} props The item properties
	 * @returns {number} The number of items in the array
	 */

	;(0, _createClass3.default)(ItemsManager, [
		{
			key: 'add',
			value: function add(name, props) {
				return this.array.push(getItem(name, props))
			}

			/**
			 * Adds a new item to a folder
			 *
			 * @param {string} folderName The new item name
			 * @param {string} itemName The path in case of a request item
			 * @param {object} [props] The properties Item object or null, in which case a folder will be created
			 * @returns {number} The index of the new item
			 */
		},
		{
			key: 'addToFolder',
			value: function addToFolder(folderName, itemName, props) {
				var folder = this.find(folderName)

				if (folder) {
					return folder.item.push(
						!props ? getFolder(itemName) : getItem(itemName, props)
					)
				}

				throw new Error(
					'addToFolder: Item named "' + name + '" could not be found!'
				)
			}

			/**
			 * Adds a new folder
			 *
			 * @param {string} name The name of the new folder
			 * @param {string} [parent] The parent folder if any
			 * @returns {number} The index of the new folder
			 */
		},
		{
			key: 'addFolder',
			value: function addFolder(name, parent) {
				if (!parent) {
					return this.array.push(getFolder(name))
				}
				return this.addToFolder(parent, name)
			}

			/**
			 * Returns the object representation fo the instance
			 *
			 * @returns {object<Item>} The request items array
			 */
		},
		{
			key: 'toJSON',
			value: function toJSON() {
				var convert = function convert(array) {
					return array.map(function(item) {
						if (!item.request) {
							item.item = convert(item.item)
							return item
						}

						var clone = (0, _lodash2.default)(item)

						if (clone.event instanceof _eventsManager2.default) {
							clone.event = clone.event.toJSON()
						}

						if (
							clone.request.header instanceof
							_headersManager2.default
						) {
							clone.request.header = clone.request.header.toJSON()
						}

						return clone
					})
				}

				return convert(this.array)
			}
		}
	])
	return ItemsManager
})(_operations2.default)

/**
 * Return a folder definition
 *
 * @param {string} name The name of the folder
 * @returns {object} The folder
 * @ignore
 */

var getFolder = function getFolder(name) {
	return {
		id: (0, _uuidByString2.default)(name),
		name: name,
		item: []
	}
}

/**
 * Returns a Item object
 *
 * @param {string} name The item name. Used to generate it's it and in searches
 * @param {object} props The method name
 * @returns {Item} The item object
 * @ignore
 */
var getItem = function getItem(name, props) {
	var _ref = props || {},
		path = _ref.path,
		method = _ref.method,
		headers = _ref.headers,
		protocol = _ref.protocol,
		host = _ref.host,
		port = _ref.port,
		query = _ref.query,
		body = _ref.body,
		response = _ref.response

	var item = {
		name: name,
		request: {
			method: (method || 'get').toUpperCase(),
			header: new _headersManager2.default(headers),
			body: body || {},
			url: {}
		},
		response: response || []
	}

	if ((0, _util.isUrl)(path)) {
		var urlObject = _url2.default.parse(path)
		item.request.url = {
			path: urlObject.pathname,
			host: urlObject.hostname,
			protocol: urlObject.protocol.replace(':', ''),
			port: urlObject.port,
			query: _queryString2.default.parse(urlObject.query || ''),
			variable: []
		}
	} else {
		item.request.url = {
			path: path,
			host: host,
			protocol: protocol || 'http',
			port: port,
			query: query || [],
			variable: []
		}
	}

	item.id = (0, _uuidByString2.default)(method + name)

	item.event = new _eventsManager2.default()

	return item
}

exports.default = ItemsManager
