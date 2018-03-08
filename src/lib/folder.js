import header from './header'
import operations from './operations'

const folder = collection => (name, parent) => {
	return {
		add: add(collection)
	}
}

/**
 * Add a new header
 * @param {object} folder The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (id, name) => {
	if (!operations(collection.item).findIndex(id)) {
		const item = {
			id: id,
			name: `${name} Api Endpoints`,
			item: []
		}

		return collection.item.push(item)
	}
}

export default item
