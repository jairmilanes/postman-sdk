import getUuidByString from 'uuid-by-string'
import Collection from './../collection'

export const METHODS = [
    "addHeader",
    "findHeader",
    "findHeaderBy",
    "findHeaderWith",
    "findHeaderIndex",
    "hasHeader",
    "removeHeader"
]

const HEADER_1 = {
	key: 'Content-Type',
	value: 'application/json'
}

const HEADER_2 = {
	key: 'Accept',
	value: 'application/json'
}

const HEADER_3 = {
	key: 'Authorization',
	value: 'Bearer {{TOKEN}}'
}

const DUMMY_HEADER = {
	key: 'Fake Header',
	value: 'Fake value'
}

const ITEM_1 = { name: '/test-endpoint', method: 'GET' }
ITEM_1.id = getUuidByString(ITEM_1.method + ITEM_1.name)

describe('Request Headers:', () => {
	const collection = Collection('Test Collection', '1.0.0')
	collection.item.add(ITEM_1.name, ITEM_1.method)
	const item = collection.item.find(ITEM_1.name)

	describe('Create New Item with Headers', () => {
		METHODS.forEach(method => expect(item).toHaveProperty(method))
	})

	describe('Operations: ', () => {
		it('Should add new headers', () => {
            item.addHeader(HEADER_1)
            item.addHeader(HEADER_2)
            item.addHeader(HEADER_3.key, HEADER_3.value)
			expect(item.request.headers).toHaveLength(3)
		})

		it('Should find a header', () => {
			expect(item.findHeader(HEADER_2)).toMatchObject(HEADER_2)
		})

		it('Should NOT find a variable', () => {
			expect(item.findHeader(DUMMY_HEADER)).toBeNull()
		})

		it('Should remove variables to the environment', () => {
            item.removeHeader(HEADER_1)
            item.removeHeader(HEADER_2)
			expect(item.request.headers).toHaveLength(1)
			expect(item.findHeader(HEADER_2)).toBeNull()
			expect(item.findHeader(HEADER_1)).toBeNull()
			expect(item.findHeader(HEADER_3)).toMatchObject(HEADER_3)
		})
	})
})
