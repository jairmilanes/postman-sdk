'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _extends2 = require('babel-runtime/helpers/extends')

var _extends3 = _interopRequireDefault(_extends2)

var _url = require('url')

var _url2 = _interopRequireDefault(_url)

var _header = require('./header')

var _header2 = _interopRequireDefault(_header)

var _operations = require('./operations')

var _operations2 = _interopRequireDefault(_operations)

var _uuidByString = require('uuid-by-string')

var _uuidByString2 = _interopRequireDefault(_uuidByString)

var _event = require('./event')

var _queryString = require('query-string')

var _queryString2 = _interopRequireDefault(_queryString)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

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

var item = function item(collection) {
	return (0, _extends3.default)(
		{
			add: add(collection),
			addFolder: addFolder(collection.item),
			addToFolder: addToFolder(collection.item)
		},
		(0, _operations2.default)(collection.item, 'name')
	)
}

/**
 * AddToFolder constructor
 *
 * @param {object} array The collection object
 * @param {boolean} isFolder If the object is to be a folder or an request item
 * @returns {function(name:string,path:string,method:string)} addToFolder function
 */
var addToFolder = function addToFolder(array) {
	var isFolder =
		arguments.length > 1 && arguments[1] !== undefined
			? arguments[1]
			: false
	return (
		/**
		 * Add to folder function
		 *
		 * @param {string} folderName The new item name
		 * @param {string} itemName The path in case of a request item
		 * @param {object} props The properties object
		 * @returns {number} The index of the new item
		 */
		function(folderName, itemName, props) {
			var op = (0, _operations2.default)(array, 'name')
			var folder = op.find(folderName)

			if (folder) {
				return folder.item.push(
					isFolder ? getFolder(itemName) : getItem(itemName, props)
				)
			}

			throw new Error(
				'addToFolder: Item named "' + name + '" could not be found!'
			)
		}
	)
}

/**
 * AddFolder constructor
 *
 * @param {array} array The items array
 * @returns {function(*): *} addFolder function
 */
var addFolder = function addFolder(array) {
	return (
		/**
		 * Adds an new folder
		 *
		 * @param {string} name The name of the new folder
		 * @param {string} parent The parent folder if any
		 * @returns {number} The index of the new folder
		 */
		function(name) {
			var parent =
				arguments.length > 1 && arguments[1] !== undefined
					? arguments[1]
					: null

			if (!parent) {
				return array.push(getFolder(name))
			}

			return addToFolder(array, true)(parent, name)
		}
	)
}

/**
 * Add a new header
 * @param {object} collection The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
var add = function add(collection) {
	return function(name, props) {
		return collection.item.push(getItem(name, props))
	}
}

/**
 * Return a folder definition
 *
 * @param {string} name The name of the folder
 * @returns {object} The folder
 */
var getFolder = function getFolder(name) {
	return {
		id: (0, _uuidByString2.default)(name),
		name: name,
		item: []
	}
}

/**
 * Checks if a string is an url
 *
 * @param str
 * @returns {boolean}
 */
var isUrl = function isUrl(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // fragment locator
	return pattern.test(str)
}

/**
 * Returns a Item object
 *
 * @param {string} path The path for the request, it can be a full url or just the path
 * @param {string} method The method name
 * @param {object} props The method name
 * @returns {object} The item object
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
			headers: headers || [],
			body: body || {},
			url: {}
		},
		response: response || {},
		event: []
	}

	if (isUrl(path)) {
		var urlObject = _url2.default.parse(path)
		item.request.url = {
			path: urlObject.pathname,
			host: urlObject.host,
			protocol: urlObject.protocol.replace(':', ''),
			port: urlObject.port,
			query: _queryString2.default.parse(urlObject.query || ''),
			variables: []
		}
	} else {
		item.request.url = {
			path: path,
			host: host,
			protocol: protocol,
			port: port,
			query: query,
			variables: []
		}
	}

	item.id = (0, _uuidByString2.default)(method + name)

	return (0, _extends3.default)(
		{},
		item,
		(0, _header2.default)(item.request.headers),
		(0, _event.itemEvents)(item.event)
	)
}

exports.default = item
