import getUuidByString from 'uuid-by-string'
import Collection from './../collection'

export const METHODS = ['collection', 'item', 'event']
const COLLECTION_NAME = 'Test Collection'
const COLLECTION_VERSION = '1.0.0'
const ITEM_1 = { name: '/test-endpoint', method: 'GET' }
const ITEM_2 = { name: '/test-endpoint-2', method: 'POST' }
const ITEM_3 = { name: '/test-endpoint-3', method: 'PATCH' }

ITEM_1.id = getUuidByString(ITEM_1.method + ITEM_1.name)
ITEM_2.id = getUuidByString(ITEM_2.method + ITEM_2.name)
ITEM_3.id = getUuidByString(ITEM_3.method + ITEM_3.name)

describe('Collection:', () => {
	const collection = Collection(COLLECTION_NAME, COLLECTION_VERSION)

	it('should create a new collection: ', () => {
		expect(Object.keys(collection)).toMatchObject(METHODS)

		expect(Object.keys(collection.collection)).toMatchObject([
			'info',
			'item',
			'event',
			'variable'
		])

		expect(Object.keys(collection.collection.info)).toMatchObject([
			'version',
			'name',
			'schema'
		])

		expect(collection.collection.info.schema).toEqual(
			'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
		)

		expect(collection.collection.info.name).toEqual(COLLECTION_NAME)
		expect(collection.collection.info.version).toEqual(COLLECTION_VERSION)
	})

	describe('Operations: ', () => {
		it('Should add new item', () => {
			collection.item.add(ITEM_1.name, ITEM_1.method)
			collection.item.add(ITEM_2.name, ITEM_2.method)
			collection.item.add(ITEM_3.name, ITEM_3.method)
			expect(collection.collection.item).toHaveLength(3)
		})

		it('Should find an item', () => {
			const found = collection.item.find(ITEM_2.name)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(ITEM_2.id)
		})

		it('Should NOT find an item', () => {
			const found = collection.item.find('/dummy')
			expect(found).toBeNull()
		})

		it('Should remove items from collection', () => {
			collection.item.remove(ITEM_1.name)
			collection.item.remove(ITEM_3.name)
			expect(collection.collection.item).toHaveLength(1)
			expect(collection.item.findBy('name', ITEM_1.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_3.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_2.name).id).toEqual(
				ITEM_2.id
			)
		})
	})
})
