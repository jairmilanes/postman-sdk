import Environment from '../environment'

export const METHODS = [
	'add',
	'findIndex',
	'findWith',
	'findBy',
	'find',
	'has',
	'removeFrom',
	'remove'
]

const VARIABLE_1 = {
	key: 'test 1',
	value: 'test value 1',
	type: 'string',
	enabled: true
}

const VARIABLE_2 = {
	key: 'test 2',
	value: 'test value 2',
	type: 'string',
	enabled: true
}

const VARIABLE_3 = {
	key: 'test 3',
	value: 'test value 3',
	type: 'string',
	enabled: true
}

const DUMMY_VARIABLE = {
	key: 'test dummy',
	value: 'test dummy value 3',
	type: 'string',
	enabled: true
}

describe('Environment:', () => {
	const environment = Environment('test')

	describe('Create New Environment', () => {
		it('Should create a new environment object', () => {
			expect(environment).toHaveProperty('environment')
		})

		it('Should contain the correct methods', () => {
			expect(Object.keys(environment)).toMatchObject([
				'environment',
				...METHODS
			])
			expect(Object.keys(environment)).toHaveLength(9)
		})

		it('Should contain the correct properties', () => {
			expect(environment.environment).toHaveProperty('name')
			expect(environment.environment).toHaveProperty('values')
		})

		it('Should contain 0 items', () => {
			expect(environment.environment.values).toHaveLength(0)
		})
	})

	describe('Operations: ', () => {
		it('Should add variables to the environment', () => {
			environment.add(VARIABLE_1)
			environment.add(VARIABLE_2)
			environment.add(VARIABLE_3)
			expect(environment.environment.values).toHaveLength(3)
		})

		it('Should find a variable', () => {
			expect(environment.find(VARIABLE_2)).toMatchObject(VARIABLE_2)
		})

		it('Should NOT find a variable', () => {
			expect(environment.find(DUMMY_VARIABLE)).toBeNull()
		})

		it('Should remove variables to the environment', () => {
			environment.remove(VARIABLE_1)
			environment.remove(VARIABLE_2)
			expect(environment.environment.values).toHaveLength(1)
			expect(environment.find(VARIABLE_2)).toBeNull()
			expect(environment.find(VARIABLE_1)).toBeNull()
			expect(environment.find(VARIABLE_3)).toMatchObject(VARIABLE_3)
		})
	})
})
