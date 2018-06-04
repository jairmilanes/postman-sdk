import EnvironmentMananger from '../../environment-manager'

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
	const environment = new EnvironmentMananger('test')

	describe('Create New Environment', () => {
		it('Should contain the correct methods', () => {
			expect(typeof environment.add).toEqual('function')
			expect(typeof environment.findIndex).toEqual('function')
			expect(typeof environment.findWith).toEqual('function')
			expect(typeof environment.findBy).toEqual('function')
			expect(typeof environment.find).toEqual('function')
			expect(typeof environment.has).toEqual('function')
			expect(typeof environment.removeFrom).toEqual('function')
			expect(typeof environment.remove).toEqual('function')
		})

		it('Should contain the correct properties', () => {
			expect(environment.toJSON().environment).toHaveProperty('name')
			expect(environment.toJSON().environment).toHaveProperty('values')
		})

		it('Should contain 0 items', () => {
			expect(environment.toJSON().environment.values).toHaveLength(0)
		})
	})

	describe('Operations: ', () => {
		it('Should add variables to the environment', () => {
			environment.add(VARIABLE_1)
			environment.add(VARIABLE_2)
			environment.add(VARIABLE_3)
			expect(environment.toJSON().environment.values).toHaveLength(3)
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
			expect(environment.toJSON().environment.values).toHaveLength(1)
			expect(environment.find(VARIABLE_2)).toBeNull()
			expect(environment.find(VARIABLE_1)).toBeNull()
			expect(environment.find(VARIABLE_3)).toMatchObject(VARIABLE_3)
		})
	})
})
