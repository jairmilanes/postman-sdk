import CollectionManager from '../../collection-manager'
import { ITEM_1 } from '../__mocks__/mocked-items'
import {
	HEADER_1,
	HEADER_2,
	HEADER_3,
	DUMMY_HEADER
} from '../__mocks__/mocked-headers'

describe('Request Headers:', () => {
	const collection = new CollectionManager('Test Collection', '1.0.0')
	collection.item.add(ITEM_1.name, ITEM_1.props)
	const item = collection.item.find(ITEM_1.name)

	describe('Create New Item with Headers', () => {
		expect(typeof item.request.header.add).toEqual('function')
		expect(typeof item.request.header.findIndex).toEqual('function')
		expect(typeof item.request.header.findWith).toEqual('function')
		expect(typeof item.request.header.findBy).toEqual('function')
		expect(typeof item.request.header.find).toEqual('function')
		expect(typeof item.request.header.has).toEqual('function')
		expect(typeof item.request.header.removeFrom).toEqual('function')
		expect(typeof item.request.header.remove).toEqual('function')
	})

	describe('Operations: ', () => {
		it('Should add new headers', () => {
			item.request.header.add(HEADER_1)
			item.request.header.add(HEADER_2)
			item.request.header.add(HEADER_3.key, HEADER_3.value)
			expect(item.request.header.toJSON()).toHaveLength(3)
		})

		it('Should find a header', () => {
			expect(item.request.header.find(HEADER_2.key)).toMatchObject(
				HEADER_2
			)
		})

		it('Should NOT find a header', () => {
			expect(item.request.header.find(DUMMY_HEADER.key)).toBeNull()
		})

		it('Should remove headers', () => {
			item.request.header.remove(HEADER_1.key)
			item.request.header.remove(HEADER_2.key)
			expect(item.request.header.toJSON()).toHaveLength(1)
			expect(item.request.header.find(HEADER_2.key)).toBeNull()
			expect(item.request.header.find(HEADER_1.key)).toBeNull()
			expect(item.request.header.find(HEADER_3.key)).toMatchObject(
				HEADER_3
			)
		})
	})
})
