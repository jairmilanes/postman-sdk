'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _collectionItem = require('./collection-item');

var _collectionItem2 = _interopRequireDefault(_collectionItem);

var _event = require('./event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a postman collection json file
 * @param {string} name The collection name
 * @param {string|null} version The collection verion
 * @returns {
 *    {
 *      collection: object,
 *      add: function(key:string, value:string),
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
 *    }
 *  } The operations object
 */
const collection = (name, version = null) => {
	const collection = {
		info: {
			version: version || '0.0.1',
			name: name,
			schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
		},
		item: [],
		event: [],
		variable: []
	};

	return {
		collection,
		item: (0, _collectionItem2.default)(collection),
		event: (0, _event.collectionEvents)(collection.event)
	};
};

exports.default = collection;