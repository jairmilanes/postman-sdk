'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _operations = require('./operations');

var _operations2 = _interopRequireDefault(_operations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const folder = collection => (name, parent) => {
	return {
		add: add(collection)
	};
};

/**
 * Add a new header
 * @param {object} folder The item
 * @returns {function(path:string, method:string): object} The position of the new item
 */
const add = collection => (id, name) => {
	if (!(0, _operations2.default)(collection.item).findIndex(id)) {
		const item = {
			id: id,
			name: `${name} Api Endpoints`,
			item: []
		};

		return collection.item.push(item);
	}
};

exports.default = item;