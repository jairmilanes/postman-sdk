import getUuidByString from 'uuid-by-string'
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
const ITEM_1 = { name: '/test-endpoint', method: 'GET' }
const ITEM_2 = { name: '/test-endpoint-2', method: 'POST' }
const ITEM_3 = { name: '/test-endpoint-3', method: 'PATCH' }
const ITEM_4 = { name: '/test-endpoint-4', method: 'DELETE' }
const FOLDER_1 = { name: 'folder 1' }
const FOLDER_2 = { name: 'folder 2' }
const FOLDER_3 = { name: 'folder 3' }

ITEM_1.id = getUuidByString(ITEM_1.method + ITEM_1.name)
ITEM_2.id = getUuidByString(ITEM_2.method + ITEM_2.name)
ITEM_3.id = getUuidByString(ITEM_3.method + ITEM_3.name)
ITEM_4.id = getUuidByString(ITEM_4.method + ITEM_4.name)
FOLDER_1.id = getUuidByString(FOLDER_1.name)
FOLDER_2.id = getUuidByString(FOLDER_2.name)
FOLDER_3.id = getUuidByString(FOLDER_3.name)

describe('Collection Item:', () => {
	const collection = Collection('Test Collection')
	collection.item.add(ITEM_1.name, ITEM_1.method)
	const item = collection.item.find(ITEM_1.name)

	describe('Item: ', () => {

		it('should contain all methods', () => {
            expect(Object.keys(collection.item)).toMatchObject(METHODS)
		})

        it('should contain all properties', () => {
            expect(Object.keys(item)).toMatchObject([
                'id',
                'name',
                'request',
                'response',
                'event'
            ])
        })

        it('should contain a request object', () => {
            expect(Object.keys(item.request)).toMatchObject([
                'method',
                'headers',
                'body',
                'url'
            ])
        })
        it('should contain a url object', () => {
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
	})

	describe('Folders: ', () => {
		it('Should add folders', () => {
			collection.item.addFolder(FOLDER_1.name)
			collection.item.addFolder(FOLDER_2.name)
			expect(collection.collection.item).toHaveLength(3)
			expect(collection.item.find(FOLDER_1.name)).not.toHaveProperty(
				'request'
			)
			expect(collection.item.find(FOLDER_1.name).id).toEqual(FOLDER_1.id)
			expect(collection.item.find(FOLDER_2.name)).not.toHaveProperty(
				'request'
			)
			expect(collection.item.find(FOLDER_2.name).id).toEqual(FOLDER_2.id)
		})

		it('Should add folders to folders', () => {
			collection.item.addFolder(FOLDER_3.name, FOLDER_1.name)
			expect(collection.item.find(FOLDER_3.name).id).toEqual(FOLDER_3.id)
		})

		it('Should find folders', () => {
			const found = collection.item.find(FOLDER_2.name)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(FOLDER_2.id)
		})

		it('Should find folders by name', () => {
			const found = collection.item.findBy('name', FOLDER_2.name)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(FOLDER_2.id)
		})

		it('Should remove folders', () => {
			const object = collection.item.find(FOLDER_2.name)
			expect(collection.item.remove(FOLDER_2.name)).toMatchObject([object])
		})
	})

	describe('Operations: ', () => {
		it('Should add new item', () => {
			collection.item.add(ITEM_2.name, ITEM_2.method)
			collection.item.add(ITEM_3.name, ITEM_3.method)
			expect(collection.collection.item).toHaveLength(4)
		})

		it('Should add new item to folder', () => {
			collection.item.addToFolder(FOLDER_1.name, ITEM_4.name, ITEM_4.method)
			const found = collection.item.find(ITEM_4.name)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(ITEM_4.id)
		})

		it('Should throw error ir folder dont exist', () => {
			expect(() => {
				collection.item.addToFolder('dummy', ITEM_4.name, ITEM_4.method)
			}).toThrow()
		})

		it('Should find an item', () => {
			const found = collection.item.findBy('name', ITEM_2.name)
			expect(found).toHaveProperty('id')
			expect(found.id).toEqual(ITEM_2.id)
		})

		it('Should NOT find an item', () => {
			const found = collection.item.findBy('name', '/dummy')
			expect(found).toBeNull()
		})

		it('Should remove from folders', () => {
			const removed = collection.item.remove(ITEM_4.name, FOLDER_1.name)
			expect(removed[0]).toHaveProperty('id')
			expect(removed[0].id).toEqual(ITEM_4.id)
		})

		it('Should NOT remove if not found', () => {
			const removed = collection.item.remove('dummy', FOLDER_1.name)
			expect(removed).toHaveLength(0)
		})

		it('Should remove items from collection', () => {
			collection.item.remove(ITEM_1.name)
			collection.item.remove(ITEM_3.name)
			expect(collection.collection.item).toHaveLength(2)
			expect(collection.item.findBy('name', ITEM_1.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_3.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_2.name).id).toEqual(
				ITEM_2.id
			)
		})
	})
})
