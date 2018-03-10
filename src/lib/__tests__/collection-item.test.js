import Collection from './../collection'

export const METHODS = [
	'request',
	'add',
	'addFolder',
	'addToFolder',
	'findIndex',
	'findWith',
	'findBy',
	'find',
	'has',
	'remove'
]
const ITEM_1 = '/test-endpoint'
const ITEM_2 = '/test-endpoint-2'
const ITEM_3 = '/test-endpoint-3'
const ITEM_4 = '/test-endpoint-4'
const FOLDER_1 = 'folder 1'
const FOLDER_2 = 'folder 2'
const FOLDER_3 = 'folder 3'

describe('Collection Item:', () => {
	const collection = Collection('Test Collection')
	collection.item.add(ITEM_1, 'GET')
	const item = collection.item.find('/test-endpoint')

	describe('Create New Item: ', () => {
		expect(Object.keys(collection.item)).toMatchObject(METHODS)

		expect(Object.keys(item)).toMatchObject([
			'id',
			'name',
			'request',
			'response',
			'event'
		])

		expect(Object.keys(item.request)).toMatchObject([
			'method',
			'headers',
			'body',
			'url'
		])

		expect(Object.keys(item.request.url)).toMatchObject([
			'raw',
			'path',
			'host',
			'port',
			'protocol',
			'query',
			'variable'
		])
	})

	describe('Folders: ', () => {
		it('Should add folders', () => {
			collection.item.addFolder(FOLDER_1)
			collection.item.addFolder(FOLDER_2)
			expect(collection.collection.item).toHaveLength(3)
			expect(collection.item.find(FOLDER_1)).not.toHaveProperty('request')
			expect(collection.item.find(FOLDER_1).id).toEqual(FOLDER_1)
			expect(collection.item.find(FOLDER_2)).not.toHaveProperty('request')
			expect(collection.item.find(FOLDER_2).id).toEqual(FOLDER_2)
		})

		it('Should add folders to folders', () => {
			collection.item.addFolder(FOLDER_3, FOLDER_1)
			expect(collection.item.find(FOLDER_3).id).toEqual(FOLDER_3)
		})

		it('Should find folders', () => {
			const found = collection.item.find(FOLDER_2)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(FOLDER_2)
		})

		it('Should remove folders', () => {
			const object = Object.assign({}, collection.collection.item[2])
			expect(collection.item.remove(FOLDER_2)).toMatchObject([object])
		})
	})

	describe('Operations: ', () => {
		it('Should add new item', () => {
			collection.item.add(ITEM_2, 'POST')
			collection.item.add(ITEM_3, 'PUT')
			expect(collection.collection.item).toHaveLength(4)
		})

		it('Should add new item to folder', () => {
			collection.item.addToFolder(FOLDER_1, ITEM_4, 'PATCH')
			const found = collection.item.find(ITEM_4)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(ITEM_4)
		})

		it('Should throw error ir folder dont exist', () => {
			expect(() => {
				collection.item.addToFolder('dummy', ITEM_4, 'PATCH')
			}).toThrow()
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

		it('Should remove from folders', () => {
			const removed = collection.item.remove(ITEM_4, FOLDER_1)
			expect(removed[0]).toHaveProperty('id')
			expect(removed[0].id).toEqual(ITEM_4)
		})

		it('Should NOT remove if not found', () => {
			const removed = collection.item.remove('dummy', FOLDER_1)
			expect(removed).toHaveLength(0)
		})

		it('Should remove items from collection', () => {
			collection.item.remove(ITEM_1)
			collection.item.remove(ITEM_3)
			expect(collection.collection.item).toHaveLength(2)
			expect(collection.item.find(ITEM_1)).toBeNull()
			expect(collection.item.find(ITEM_3)).toBeNull()
			expect(collection.item.find(ITEM_2).id).toEqual(ITEM_2)
		})
	})
})
