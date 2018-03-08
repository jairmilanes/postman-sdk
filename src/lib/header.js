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
	const headers = [
		{
			key: 'Content-Type',
			value: 'application/json'
		},
		{
			key: 'Accept',
			value: 'application/json'
		},
		{
			key: 'Authorization',
			value: 'Bearer {{TOKEN}}'
		}
	]

	item.request.headers = headers

	return {
		add: add(item),
		...operations(headers)
	}
}

/**
 * Add a new header
 * @param {object} item The item
 * @returns {function(key:string, value:string): number} The position of the new item
 */
const add = item => (key, value) =>
	item.request.headers.push({
		key: key,
		value: value
	})

export default header
