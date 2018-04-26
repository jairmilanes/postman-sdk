import operations from "./operations";
import getUuidByString from "uuid-by-string/index";


export const itemEvents = (eventList) => {
    const methods = operations(eventList, 'id')

    return {
        /**
         * Add an event to the item
         */
        addEvent: add(eventList),
        /**
         * Find's an event in a item
         */
        findEventIndex: methods.findIndex,

        /**
         * Finds an event with a callback function
         */
        findEventWith: methods.findWith,

        /**
         * Finds an event by any event property
         */
        findEventBy: methods.findBy,

        /**
         * Finds an event by id
         */
        findEvent: methods.find,

        /**
         * Check if an item has an event
         */
        hasEvent: methods.has,

        /**
         * Removes an event from an item
         */
        removeEvent: methods.remove
    }
}

export const collectionEvents = (eventList) => {
    const methods = operations(eventList, 'id')
    return {
        add: add(eventList),
        ...methods
    }
}

/**
 * Adds a new event to the current collection
 *
 * @param eventList
 * @returns {function(params:object)}
 */
const add = eventList => params => {
    const {name, listen, disabled, type, exec, source} = params

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
        throw new Error("Cannot create an event without a script to run")
    }

    if (exec) {
        event.script.exec = exec
    }

    if (source) {
        event.script.source = source
    }

    eventList.push(event)
}