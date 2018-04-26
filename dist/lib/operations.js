'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = require('./../helper/util');

/**
 * Operations
 *
 * @param {array} array The collection to manage
 * @param {string} stringKey The key to which find items by
 * @returns {{findIndex: Function, findWith: (function(Function)), findBy: Function, find: Function, has: Function, remove: Function}}
 */
const operations = (array, stringKey = 'name') => {
    const o = {};

    /**
     * Find's an item's index in the list
     *
     * @param {string} identifier The item identifier value
     * @param {object[]} target The list to perform the search on, if not provided the default list will be used
     * @returns {number} The found item index or -1
     */
    o.findIndex = (identifier, target = null) => (target || array).findIndex(value => value[stringKey] === ensureStringValue(identifier, stringKey));

    /**
     * Finds an item using a callback function
     *
     * @param {function} callback The callback function to call for each item, this function should return true if you found the item and false otherwise
     */
    o.findWith = callback => array.find(callback);

    /**
     * Find's an item by one of the item keys of your choice
     *
     * @param {string} by The key to look for in the item
     * @param {string} value The value of the key
     * @returns {object|null} The found object or null
     */
    o.findBy = (by, value) => (0, _util.recursify)(array, by, value);

    /**
     * Finds an item by the name
     *
     * @params {string} identifier The search identifier (eg: name, id)
     * @returns {object} The found item object or null
     */
    o.find = identifier => (0, _util.recursify)(array, stringKey, ensureStringValue(identifier, stringKey));

    /**
     * Checks if an item exists
     *
     * @param {string} identifier The item name
     * @returns {object} True if the item exists fals otherwise
     */
    o.has = identifier => (0, _util.recursify)(array, stringKey, ensureStringValue(identifier, stringKey)) !== null;

    /**
     * Removes an item from an specific folder
     *
     * @param {string} identifier The item identifier
     * @param {string|null} from The folder name
     * @returns {*}
     */
    o.removeFrom = (identifier, from) => {
        const found = o.find(from);
        if (found && found.hasOwnProperty('item')) {
            const index = o.findIndex(identifier, found.item);
            return index > -1 ? found.item.splice(index, 1) : [];
        }
        return [];
    };

    /**
     * Removes an item from the list
     *
     * @param {string} identifier The item identifier
     * @param {string|null} parent The item identifier
     */
    o.remove = (identifier, parent = null) => {
        if (parent) {
            return o.removeFrom(ensureStringValue(identifier, stringKey), parent);
        }
        const found = o.findIndex(ensureStringValue(identifier, stringKey));
        return found > -1 ? array.splice(found, found + 1) : null;
    };

    return o;
};

/**
 * Ensure's the value is a string
 *
 * @param {object|string} object The object or string with the Key
 * @param {string} key If object, use this key to get the string value
 * @returns {string} The string value
 */
const ensureStringValue = (object, key) =>
// @todo do a better object type check here
typeof object === 'object' ? object[key] : object;

exports.default = operations;