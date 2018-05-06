import operations from './operations'

/**
 * Creates a item request headers array
 *
 * @param {object[]} headerList The item
 * @returns {{addHeader: (function(string, string): number), findHeader: Function, findHeaderBy: Function, findHeaderWith: (function(Function)), findHeaderIndex: Function, hasHeader: Function, removeHeader: Function}}
 */
const header = headerList => {
	const methods = operations(headerList, 'key')
	return {
		addHeader: add(headerList),
		findHeader: methods.find,
		findHeaderBy: methods.findBy,
		findHeaderWith: methods.findWith,
		findHeaderIndex: methods.findIndex,
		hasHeader: methods.has,
		removeHeader: methods.remove
	}
}

/**
 * Add a new header
 *
 * @param {object} item The item
 * @returns {function(key:string, value:string): number} The position of the new item
 */
const add = headerList => (key, value) => {
	if (typeof key === 'object') {
		return headerList.push({
			key: key.key,
			value: key.value
		})
	}

	return headerList.push({
		key: key,
		value: value
	})
}

export default header
