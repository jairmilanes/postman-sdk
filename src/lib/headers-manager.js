import Operations from './operations'

/**
 * Creates a item request headers array
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
class HeadersManager extends Operations {
	/**
	 * Creates a new HeadersManager instance
	 */
	constructor() {
		super('key')
	}

	/**
	 * Add a new header
	 *
	 * @param {string|object} key The header name or the header object
	 * @param {string} value The header value
	 * @returns {number} The number of items in the array
	 */
	add(key, value) {
		if (typeof key === 'object') {
			return this.array.push({
				key: key.key,
				value: key.value
			})
		}

		return this.array.push({
			key: key,
			value: value
		})
	}
}

export default HeadersManager
