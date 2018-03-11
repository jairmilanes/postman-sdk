/**
 * Simple recursive utility
 *
 * @param {array} array The array to look into
 * @param {string} by The key to compare
 * @param {string} value The value to compare
 * @returns {null|*} Null or the value found
 */
export const recursify = (array, by, value) => {
	/**
	 * @param {number} index The current index
	 * @returns {null|*} Null or the value found
	 */
	const r = index => {
		if (!array.length) {
			return null
		}

		if (array[index][by] === value) {
			return array[index]
		}

		if (array[index].item instanceof Array && array[index].item.length) {
			const found = recursify(array[index].item, by, value)
			if (found) {
				return found
			}
		}

		if (++index > array.length - 1) {
			return null
		}

		return r(index)
	}

	return r(0)
}
