import operations from './operations'

/**
 * Creates a new environment
 *
 * @param {string} name The environment name
 * @returns {
 *    {
 *      add: function(key:string, value:string),
 *      findIndex: function(item:object),
 *      find: function(item:object),
 *      has: function(item:object),
 *      remove: function(item:object)
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
