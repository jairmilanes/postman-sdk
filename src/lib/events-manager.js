import Operations from './operations'
import getUuidByString from 'uuid-by-string/index'

/**
 * @typedef {object} EventProperties
 * @property {string} name The script name
 * @property {string} [listen=prerequest] The event that triggers (prerequest, test)
 * @property {boolean} [disabled=false] A flag indicating if this script is disabled
 * @property {string} [type=text/javascript] The script type eg: text/javascript
 * @property {String[]} [exec=] An array of string commands to be executed
 * @property {string} [source=] The url of the script to be executed eg: http://mysite.com/script.js
 */

/**
 * @typedef {object} Event
 * @property {string} id The event id
 * @property {string} listen The event that triggers [prerequest | test]
 * @property {boolean} disabled A flag indicating if this script is disabled
 * @property {object} script The script object
 * @property {string} script.name The script name
 * @property {string} script.type The script type eg: text/javascript
 * @property {String[]} script.exec An array of string commands to be executed
 * @property {string} script.source The url of the script to be executed eg: http://mysite.com/script.js
 */

/**
 * Events Manager
 * This class should not be used alone, it is part of the CollectionManager Object
 * If you want to add events to a collection or item, please ude the Collection Manager class
 *
 * @extends Operations
 * @viewmeta {"navigation": false}
 */
class EventsManager extends Operations {
	/**
	 * Creates a new EventsManager instance
	 */
	constructor() {
		super('id')
	}

	/**
	 * Adds a new event to the current collection
	 *
	 * @param {EventProperties} params The event properties
	 * @returns {number} The number of items in the array
	 */
	add(params) {
		const { name, listen, disabled, type, exec, source } = params

		const event = {
			id: getUuidByString(name),
			listen: listen || 'prerequest',
			disabled: disabled || false,
			script: {
				id: getUuidByString(name),
				type: type || 'text/javascript',
				name: name
			}
		}

		if (!exec && !source) {
			throw new Error('Cannot create an event without a script to run')
		}

		if (exec) {
			event.script.exec = exec
		}

		if (source) {
			event.script.source = source
		}

		return this.array.push(event)
	}

	/**
	 * @returns {object<Event>} Returns the array of Events
	 */
	toJSON() {
		return super.toJSON()
	}
}

export default EventsManager
