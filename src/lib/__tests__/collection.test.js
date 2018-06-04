import CollectionManager from '../../collection-manager'
import ItemsManager from '../items-manager'
import EventsManager from '../events-manager'

const METHODS = ['collection', 'item', 'event']
const COLLECTION_NAME = 'Test Collection'
const COLLECTION_VERSION = '1.0.0'

describe('Collection:', () => {
	const collection = new CollectionManager(
		COLLECTION_NAME,
		COLLECTION_VERSION
	)

	it('should create a new collection: ', () => {
		expect(collection).toHaveProperty('info')
		expect(collection).toHaveProperty('item')
		expect(collection).toHaveProperty('event')
		expect(collection).toHaveProperty('variable')

		expect(Object.keys(collection.info)).toMatchObject([
			'version',
			'name',
			'schema'
		])

		expect(collection.info.schema).toEqual(
			'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
		)

		expect(collection.info.name).toEqual(COLLECTION_NAME)
		expect(collection.info.version).toEqual(COLLECTION_VERSION)
	})

	describe('Operations: ', () => {
		it('Should contain an instance of ItemsManager', () => {
			expect(collection.item).toBeInstanceOf(ItemsManager)
		})

		it('Should contain an instance of EventsManager', () => {
			expect(collection.event).toBeInstanceOf(EventsManager)
		})
	})
})
