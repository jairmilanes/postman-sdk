import CollectionManager from '../../collection-manager'

import { ITEM_1, ITEM_2, ITEM_3, ITEM_4 } from '../__mocks__/mocked-items'
import { FOLDER_1, FOLDER_2, FOLDER_3 } from '../__mocks__/mocked-folders'

export const METHODS = [
	'add',
	'addFolder',
	'addToFolder',
	'findIndex',
	'findWith',
	'findBy',
	'find',
	'has',
	'removeFrom',
	'remove'
]

describe('Collection Item:', () => {
	const collection = new CollectionManager('Test Collection')
	collection.item.add(ITEM_1.name, ITEM_1.props)
	const item = collection.item.find(ITEM_1.name)

	describe('Item: ', () => {
		it('should contain all item methods', () => {
			expect(typeof collection.item.add).toEqual('function')
			expect(typeof collection.item.findIndex).toEqual('function')
			expect(typeof collection.item.findWith).toEqual('function')
			expect(typeof collection.item.findBy).toEqual('function')
			expect(typeof collection.item.find).toEqual('function')
			expect(typeof collection.item.has).toEqual('function')
			expect(typeof collection.item.removeFrom).toEqual('function')
			expect(typeof collection.item.remove).toEqual('function')
		})

		it('should contain all event methods', () => {
			expect(typeof collection.event.add).toEqual('function')
			expect(typeof collection.event.findIndex).toEqual('function')
			expect(typeof collection.event.findWith).toEqual('function')
			expect(typeof collection.event.findBy).toEqual('function')
			expect(typeof collection.event.find).toEqual('function')
			expect(typeof collection.event.has).toEqual('function')
			expect(typeof collection.event.removeFrom).toEqual('function')
			expect(typeof collection.event.remove).toEqual('function')
		})

		it('should contain all properties', () => {
			expect(Object.keys(item).sort()).toMatchObject(
				['name', 'id', 'request', 'response', 'event'].sort()
			)
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
			expect(Object.keys(item.request.url).sort()).toMatchObject(
				[
					'path',
					'host',
					'port',
					'protocol',
					'query',
					'variables'
				].sort()
			)
		})

		it('should have parsed the url correctly', () => {
			expect(item.request.url).toMatchObject({
				protocol: 'http',
				host: 'testurl.com',
				path: '/test-endpoint',
				port: null,
				query: {
					test: '1'
				},
				variables: []
			})
		})
	})

	describe('Folders: ', () => {
		it('Should add folders', () => {
			collection.item.addFolder(FOLDER_1.name)
			collection.item.addFolder(FOLDER_2.name)
			expect(collection.item.toJSON()).toHaveLength(3)
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
			expect(collection.item.remove(FOLDER_2.name)).toMatchObject([
				object
			])
		})
	})

	describe('Operations: ', () => {
		it('Should add new item', () => {
			collection.item.add(ITEM_2.name, ITEM_2.props)
			collection.item.add(ITEM_3.name, ITEM_3.props)
			expect(collection.item.toJSON()).toHaveLength(4)
		})

		it('Should add new item to folder', () => {
			collection.item.addToFolder(
				FOLDER_1.name,
				ITEM_4.name,
				ITEM_4.props
			)
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
			expect(collection.item.toJSON()).toHaveLength(2)
			expect(collection.item.findBy('name', ITEM_1.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_3.name)).toBeNull()
			expect(collection.item.findBy('name', ITEM_2.name).id).toEqual(
				ITEM_2.id
			)
		})
	})
})
