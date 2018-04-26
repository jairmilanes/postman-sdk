import item from './collection-item'
import {collectionEvents} from './event'

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
			schema:
				'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
		},
		item: [],
		event: [],
		variable: []
	}

	return {
		collection,
		item: item(collection),
		event: collectionEvents(collection.event)
	}
}

export default collection
