import Collection from './../collection'

export const METHODS = ['collection', 'item']
const COLLECTION_NAME = 'Test Collection'
const COLLECTION_VERSION = '1.0.0'
const ITEM_1 = '/test-endpoint'
const ITEM_2 = '/test-endpoint-2'
const ITEM_3 = '/test-endpoint-3'

describe('Request Headers:', () => {
	const collection = Collection(COLLECTION_NAME, '1.0.0')

	describe('Create New Item: ', () => {
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
			collection.item.add(ITEM_1, 'GET')
			collection.item.add(ITEM_2, 'POST')
			collection.item.add(ITEM_3, 'PUT')
			expect(collection.collection.item).toHaveLength(3)
		})

		it('Should find an item', () => {
			const found = collection.item.find(ITEM_2)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(ITEM_2)
		})

		it('Should NOT find an item', () => {
			const found = collection.item.find('/dummy')
			expect(found).toBeNull()
		})

		it('Should remove items from collection', () => {
			collection.item.remove(ITEM_1)
			collection.item.remove(ITEM_3)
			expect(collection.collection.item).toHaveLength(1)
			expect(collection.item.find(ITEM_1)).toBeNull()
			expect(collection.item.find(ITEM_3)).toBeNull()
			expect(collection.item.find(ITEM_2).id).toEqual(ITEM_2)
		})
	})
})
