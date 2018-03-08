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
		add: add(collection),
		addFolder: addFolder(collection.item),
		addToFolder: addToFolder(collection.item)
	}, (0, _operations2.default)(collection.item));
};

/**
 * AddToFolder constructor
 *
 * @param {object} array The collection object
 * @returns {function(name:string,path:string,method:string)} addToFolder function
 */
const addToFolder = array =>
/**
 * Add to folder function
 *
 * @param {string} name The new item name
 * @param {string} path The path in case of a request item
 * @param {string} method The method name in case of a request item
 * @returns {number} The index of the new item
 */
(name, path, method = null) => {
	const found = (0, _operations2.default)(array).recursiFind('name', name);

	if (found) {
		return found.add(array)(path, method);
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
	const definition = {
		id: name,
		name: `${name.substr(0, 1).toUpperCase() + name.substr(1)} Api Endpoints`,
		item: []
	};

	if (!parent) {
		return array.push(definition);
	}

	return addToFolder(array)(parent, name);
};

/**
 * Add a new header
 * @param {object} collection The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (path, method) => {
	const item = {
		id: path,
		name: `${method.toUpperCase()} ${path}`,
		request: {
			method: method.toUpperCase(),
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
	};

	(0, _header2.default)(item);
	return collection.item.push(item);
};

exports.default = item;