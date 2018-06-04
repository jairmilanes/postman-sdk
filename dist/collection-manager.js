'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck')

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require('babel-runtime/helpers/createClass')

var _createClass3 = _interopRequireDefault(_createClass2)

var _itemsManager = require('./lib/items-manager')

var _itemsManager2 = _interopRequireDefault(_itemsManager)

var _eventsManager = require('./lib/events-manager')

var _eventsManager2 = _interopRequireDefault(_eventsManager)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * @typedef {Object} Collection
 * @property {Object} collection The collection key required when sending collections to the Postman servers
 * @property {Object} collection.info The info about this collection including the name and version
 * @property {Object<Item>} collection.item The collection items
 * @property {Object<Event>} collection.event The collection events
 * @property {Object[]} collection.variable The collection variables
 */

/**
 * @typedef {object} CollectionInfo
 * @property {string} name The collection name
 * @property {string} version The collection version
 * @property {string} schema The collection schema
 */

/**
 * Creates a new collection and allows you to add items, events and variables<br />
 * <br/>
 * You can add & remove items programmatically so it is easy to integrate into your build scripts and update them during deploys.<br/>
 * <br/>
 *
 * @example
 * // Creates a new collection
 * const collection = new CollectionManager('My Collection', '1.0.0')
 *
 * // Add request item to collection using a full url as path
 * collection.item.add('My Request', {path: 'http://localhost:3000/items', method 'POST'})
 *
 * // Add a new folder
 * collection.item.addFolder('Folder One')
 *
 * // Add an item to folder
 * collection.item.addToFolder(
 * 		'Folder One',
 * 		'My Request Two',
 * 		{
 * 			path: 'http://localhost:3000/api',
 * 			method: 'POST'
 * 		}
 * )
 *
 * // Add an event the the collection
 * collection.event.add({
 * 		name: 'My Event',
 * 		listen: 'prerequest',
 * 		disabled: false,
 * 		type: 'text/javascript',
 * 		exec: ['script one', 'script two'],
 * 		source: 'https://my-server.com/my-script.js'
 * })
 *
 * // Finds an request item
 * const request = collection.item.find('Test Item')
 * console.log(request)
 *
 * // Checks if the collection has an item
 * const found = collection.item.has('Test Item')
 * console.log(found)
 *
 * // Remove an item from the collection
 * collection.item.remove('My Request')
 *
 * // Remove an item from an specific folder
 * collection.item.remove('My Request Two', 'Folder One')
 *
 * // Get the JSON object represation of the collection
 * const object = collection.toJSON()
 *
 * @extends Operations
 */
var CollectionManager = (function() {
	/**
	 * Creates a new CollectionManager instance
	 *
	 * @param {string} name The collection name
	 * @param {string} [version] The current version number
	 */

	/**
	 * The collection items manager.
	 * Use this member to add, find & remove events/scripts to your collection
	 * @type {EventsManager}
	 */

	/**
	 * The collection info like name and version
	 * @type {CollectionInfo}
	 * @private
	 */
	function CollectionManager(name, version) {
		;(0, _classCallCheck3.default)(this, CollectionManager)

		this.info = {
			version: version || '0.0.0',
			name: name,
			schema:
				'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
		}
		this.item = new _itemsManager2.default()
		this.event = new _eventsManager2.default()
		this.variable = []
	}

	/**
	 * Returns an json representation of the Collection object
	 *
	 * @returns {Collection}
	 * @override
	 */

	/**
	 * The variables array.
	 * Use this member to add, find & remove variables from your collection
	 * @type {object[]}
	 */

	/**
	 * The collection items manager.
	 * Use this member to add, find & remove request items from your collection
	 * @type {ItemsManager}
	 */

	;(0, _createClass3.default)(CollectionManager, [
		{
			key: 'toJSON',
			value: function toJSON() {
				return {
					collection: {
						info: this.info,
						item: this.item.toJSON(),
						event: this.event.toJSON(),
						variable: this.variable
					}
				}
			}
		}
	])
	return CollectionManager
})()

exports.default = CollectionManager
