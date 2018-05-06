import operations from './operations'

/**
 * Creates a new environment
 *
 * @param {string} name The environment name
 * @returns {
 *    {
 *      add: function(variable:object),
 *      findIndex: function(itemName:string),
 *      find: function(itemName:string),
 *      has: function(itemName:string),
 *      remove: function(itemName:string)
 *    }
 *  } The operations object
 */
const environment = name => {
	const environment = {
		name: name,
		values: []
	}

	return {
		environment,
		add: add(environment),
		...operations(environment.values, 'key')
	}
}

/**
 * Add constructor
 * @param {object} environment The environment object
 * @returns {function(variable:object): object} add function
 */
const add = environment =>
	/**
	 * @param {object} variable A variable object
	 * @returns {Object}
	 */
	variable => {
		environment.values.push(variable)
	}

export default environment
