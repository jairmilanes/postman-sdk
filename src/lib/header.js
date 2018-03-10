import operations from './operations'

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
	return {
		add: add(item),
		...operations(item.request.headers, 'key')
	}
}

/**
 * Add a new header
 *
 * @param {object} item The item
 * @returns {function(key:string, value:string): number} The position of the new item
 */
const add = item => (key, value) => {
	if (typeof key === 'object') {
		return item.request.headers.push({
			key: key.key,
			value: key.value
		})
	}

	return item.request.headers.push({
		key: key,
		value: value
	})
}

export default header
