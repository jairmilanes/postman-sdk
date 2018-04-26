"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collectionEvents = exports.itemEvents = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _operations = require("./operations");

var _operations2 = _interopRequireDefault(_operations);

var _index = require("uuid-by-string/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itemEvents = exports.itemEvents = eventList => {
    const methods = (0, _operations2.default)(eventList, 'id');

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
    };
};

const collectionEvents = exports.collectionEvents = eventList => {
    const methods = (0, _operations2.default)(eventList, 'id');
    return (0, _extends3.default)({
        add: add(eventList)
    }, methods);
};

/**
 * Adds a new event to the current collection
 *
 * @param eventList
 * @returns {function(params:object)}
 */
const add = eventList => params => {
    const { name, listen, disabled, type, exec, source } = params;

    const event = {
        id: (0, _index2.default)(name),
        listen: listen || 'prerequest',
        disabled: disabled || false,
        script: {
            id: (0, _index2.default)(name),
            type: type || 'text/javascript',
            name: name
        }
    };

    if (!exec && !source) {
        throw new Error("Cannot create an event without a script to run");
    }

    if (exec) {
        event.script.exec = exec;
    }

    if (source) {
        event.script.source = source;
    }

    eventList.push(event);
};