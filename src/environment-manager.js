import Operations from './lib/operations'

/**
 * @typedef {object} Environment
 * @property {object} environment The required environment key when
 * @property {string} environment.name The environment name
 * @property {object[]} environment.values The environment variable objects
 */

/**
 * @class
 * @classdesc Creates a new environment instance and manage it's variables.
 *
 * You can add & remove keys programmatically so it is easy to integrate into your build scripts and update them during deploys.
 *
 * Variables can be used inside collection items by referencing each variable as {{variable}} in your collection item properties.
 *
 * This environments can then be switched in the Postman SDK allowing to easily test different environments.
 *
 * Use this to create multiple environments instead of creating one collection item per environment.
 *
 * @extends Operations
 */
export default class EnvironmentManager extends Operations {
	/**
	 * @type {string}
	 * @ignore
	 */
	name

	/**
	 * Creates a new EnvironmentManager instance
	 *
	 * @example
	 * const manager = new EnvironmentManager('MY_ENVIRONMENT')
	 *
	 * @param {string} name The environment name
	 * @returns {EnvironmentManager} The environmentManager for your new environment
	 * @override
	 */
	constructor(name) {
		super('key')
		this.name = name
	}

	/**
	 * Adds a new variable to this environment.
	 * You can either provide a object containing all the properties or pass each one to the method call.
	 *
	 * @example
	 * const manager = new EnvironmentManager('MY_ENVIRONMENT')
	 *
	 * // Use single properties
	 * manager.add('HOST', 'myhost.com', 'string', true)
	 *
	 * // Use property object
	 * manager.add({
	 *    key: 'HOST',
	 *    value: 'myhost.com',
	 *    type: 'string',
	 *    enabled: true
	 * })
	 *
	 * @param {string|object} key The variable name or the variable object. If object is provided, ignore value
	 * @param {*} [value] The variable value, ig object was provided as the first parameter, this can be ignored
	 * @param {string} [type] The variable type (string, number, boolean)
	 * @param {boolean} [enabled] A flag tallying if the variable is enabled or disabled by default
	 * @returns {number}
	 */
	add(key, value, type, enabled) {
		if (typeof key !== 'string') {
			return this.array.push(key)
		}

		if (value === null) {
			value = ''
		}

		value = value.toString()

		if (!type) {
			type = 'string'
		}

		enabled = enabled === true

		return this.array.push({ key, value, type, enabled })
	}

	/**
	 * Returns a object representation of the current instance
	 *
	 * @example
	 * const json = manager.toJSON()
	 *
	 * @returns {Environment}
	 * @override
	 */
	toJSON() {
		return {
			environment: {
				name: this.name,
				values: this.array.map(item => item)
			}
		}
	}
}
