'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _operations = require('./operations');

var _operations2 = _interopRequireDefault(_operations);

var _isUuid = require('is-uuid');

var _isUuid2 = _interopRequireDefault(_isUuid);

var _uuidByString = require('uuid-by-string');

var _uuidByString2 = _interopRequireDefault(_uuidByString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	return (0, _extends3.default)({
		request: {
			headers: _header2.default
		},
		add: add(collection),
		addFolder: addFolder(collection.item),
		addToFolder: addToFolder(collection.item)
	}, (0, _operations2.default)(collection.item, 'name'));
};

/**
 * AddToFolder constructor
 *
 * @param {object} array The collection object
 * @param {boolean} isFolder If the object is to be a folder or an request item
 * @returns {function(name:string,path:string,method:string)} addToFolder function
 */
const addToFolder = (array, isFolder = false) =>
/**
 * Add to folder function
 *
 * @param {string} name The new item name
 * @param {string} path The path in case of a request item
 * @param {string} method The method name in case of a request item
 * @returns {number} The index of the new item
 */
(name, path, method = null) => {
	const op = (0, _operations2.default)(array, 'name');
	const folder = op.find(name);

	if (folder) {
		return folder.item.push(isFolder ? getFolder(path) : getItem(path, method));
	}

	throw new Error(`addToFolder: Item named "${name}" could not be found!`);
};

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
	if (!parent) {
		return array.push(getFolder(name));
	}

	return addToFolder(array, true)(parent, name);
};

/**
 * Add a new header
 * @param {object} collection The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (path, method) => collection.item.push(getItem(path, method));

/**
 * Return a folder definition
 *
 * @param {string} name The name of the folder
 * @returns {object} The folder
 */
const getFolder = name => ({
	id: (0, _uuidByString2.default)(name),
	name: name,
	item: []
});

/**
 * Returns a Item object
 *
 * @param {string} path The path for the request
 * @param {string} method The method name
 * @returns {object} The item object
 */
const getItem = (path, method) => ({
	id: (0, _uuidByString2.default)(method + path),
	name: path,
	request: {
		method: method.toUpperCase(),
		headers: [],
		body: {},
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
});

exports.default = item;