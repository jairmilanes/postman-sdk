'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _operations = require('./operations');

var _operations2 = _interopRequireDefault(_operations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a item request headers array
 * @param {object} item The item
 * @returns {
 *    {
 *      add: function(key:string, value:string),
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
 *    }
 *  } The operations object
 */
const header = item => {
	const headers = [{
		key: 'Content-Type',
		value: 'application/json'
	}, {
		key: 'Accept',
		value: 'application/json'
	}, {
		key: 'Authorization',
		value: 'Bearer {{TOKEN}}'
	}];

	item.request.headers = headers;

	return (0, _extends3.default)({
		add: add(item)
	}, (0, _operations2.default)(headers));
};

/**
 * Add a new header
 * @param {object} item The item
 * @returns {function(key:string, value:string): number} The position of the new item
 */
const add = item => (key, value) => item.request.headers.push({
	key: key,
	value: value
});

exports.default = header;