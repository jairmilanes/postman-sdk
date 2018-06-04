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
		expect(typeof item.request.headers.add).toEqual('function')
		expect(typeof item.request.headers.findIndex).toEqual('function')
		expect(typeof item.request.headers.findWith).toEqual('function')
		expect(typeof item.request.headers.findBy).toEqual('function')
		expect(typeof item.request.headers.find).toEqual('function')
		expect(typeof item.request.headers.has).toEqual('function')
		expect(typeof item.request.headers.removeFrom).toEqual('function')
		expect(typeof item.request.headers.remove).toEqual('function')
	})

	describe('Operations: ', () => {
		it('Should add new headers', () => {
			item.request.headers.add(HEADER_1)
			item.request.headers.add(HEADER_2)
			item.request.headers.add(HEADER_3.key, HEADER_3.value)
			expect(item.request.headers.toJSON()).toHaveLength(3)
		})

		it('Should find a header', () => {
			expect(item.request.headers.find(HEADER_2.key)).toMatchObject(
				HEADER_2
			)
		})

		it('Should NOT find a header', () => {
			expect(item.request.headers.find(DUMMY_HEADER.key)).toBeNull()
		})

		it('Should remove headers', () => {
			item.request.headers.remove(HEADER_1.key)
			item.request.headers.remove(HEADER_2.key)
			expect(item.request.headers.toJSON()).toHaveLength(1)
			expect(item.request.headers.find(HEADER_2.key)).toBeNull()
			expect(item.request.headers.find(HEADER_1.key)).toBeNull()
			expect(item.request.headers.find(HEADER_3.key)).toMatchObject(
				HEADER_3
			)
		})
	})
})
