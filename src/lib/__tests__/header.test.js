import Collection from './../collection'
import { ITEM_1 } from '../__mocks__/mocked-items'
import {
	HEADER_1,
	HEADER_2,
	HEADER_3,
	DUMMY_HEADER
} from '../__mocks__/mocked-headers'

export const METHODS = [
	'addHeader',
	'findHeader',
	'findHeaderBy',
	'findHeaderWith',
	'findHeaderIndex',
	'hasHeader',
	'removeHeader'
]

describe('Request Headers:', () => {
	const collection = Collection('Test Collection', '1.0.0')
	collection.item.add(ITEM_1.name, ITEM_1.props)
	const item = collection.item.find(ITEM_1.name)

	describe('Create New Item with Headers', () => {
		METHODS.forEach(method => expect(item).toHaveProperty(method))
	})

	describe('Operations: ', () => {
		it('Should add new headers', () => {
			item.addHeader(HEADER_1)
			item.addHeader(HEADER_2)
			item.addHeader(HEADER_3.key, HEADER_3.value)
			expect(item.request.headers).toHaveLength(5)
		})

		it('Should find a header', () => {
			expect(item.findHeader(HEADER_2.key)).toMatchObject(HEADER_2)
		})

		it('Should NOT find a header', () => {
			expect(item.findHeader(DUMMY_HEADER.key)).toBeNull()
		})

		it('Should remove headers', () => {
			item.removeHeader(HEADER_1.key)
			item.removeHeader(HEADER_2.key)
			expect(item.request.headers).toHaveLength(3)
			expect(item.findHeader(HEADER_2.key)).toBeNull()
			expect(item.findHeader(HEADER_1.key)).toBeNull()
			expect(item.findHeader(HEADER_3.key)).toMatchObject(HEADER_3)
		})
	})
})
