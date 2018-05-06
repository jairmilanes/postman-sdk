import Operations from './../operations'
import {
	ITEM_1,
	ITEM_2,
	ITEM_3,
	ITEM_4,
	ITEM_4_1,
	ITEM_4_2,
	ITEM_4_3,
	ARRAY
} from './helper'

describe('Postman Collection Builder Tests', () => {
	const METHODS = [
		'findIndex',
		'findWith',
		'findBy',
		'find',
		'has',
		'removeFrom',
		'remove'
	]
	const operations = Operations(ARRAY)

	it('Should contain the defined methods', () => {
		expect(Object.keys(operations)).toMatchObject(METHODS)
	})

	describe('findIndex:', () => {
		it('Should find an item index by name', () => {
			expect(operations.findIndex(ITEM_2)).toEqual(1)
		})

		it('Should NOT find an item index if it does not exist', () => {
			expect(operations.findIndex({ name: 'test 10' })).toEqual(-1)
		})
	})

	describe('findBy:', () => {
		it('Should find an item by name', () => {
			expect(operations.findBy('name', ITEM_3.name)).toEqual(ITEM_3)
		})

		it('Should find an item by type', () => {
			expect(operations.findBy('type', ITEM_4_2.type)).toEqual(ITEM_4_2)
		})

		it('Should NOT find an item by name', () => {
			expect(operations.findBy('name', 'type 10')).toBeNull()
		})
	})

	describe('find:', () => {
		it('Should find an item', () => {
			expect(operations.find(ITEM_4_3.name)).toEqual(ITEM_4_3)
		})

		it('Should NOT find an item', () => {
			expect(operations.find('test 10')).toBeNull()
		})
	})

	describe('findWith:', () => {
		it('Should find an item', () => {
			expect(
				operations.findWith(item => item.name === ITEM_2.name)
			).toEqual(ITEM_2)
		})

		it('Should NOT find an item', () => {
			expect(
				operations.findWith(item => item.name === 'test 10')
			).toBeUndefined()
		})
	})

	describe('has:', () => {
		it('Should return true for existing item', () => {
			expect(operations.has(ITEM_4)).toBeTruthy()
		})

		it('Should return false not found items', () => {
			expect(operations.has('test 10')).toBeFalsy()
		})

		it('Should return null if the array is empty', () => {
			const operations = Operations([])
			expect(operations.has('test 10')).toBeFalsy()
		})
	})

	describe('remove:', () => {
		it('Should remove an item', () => {
			expect(operations.remove(ITEM_1)).toMatchObject([ITEM_1])
		})

		it('Should remove an item from parent', () => {
			expect(operations.remove(ITEM_4_3.name, ITEM_4.name)).toMatchObject(
				[ITEM_4_3]
			)
		})
	})
})
