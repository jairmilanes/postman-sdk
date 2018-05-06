'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})
exports.ITEM_4 = exports.ITEM_3 = exports.ITEM_2 = exports.ITEM_1 = undefined

var _uuidByString = require('uuid-by-string')

var _uuidByString2 = _interopRequireDefault(_uuidByString)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var name1 = 'test-endpoint'
var name2 = 'test-endpoint-2'
var name3 = 'test-endpoint-3'
var name4 = 'test-endpoint-4'

var ITEM_1 = (exports.ITEM_1 = {
	id: (0, _uuidByString2.default)('GET' + name1),
	name: name1,
	props: {
		path: 'http://testurl.com/test-endpoint?test=1',
		method: 'GET',
		headers: [
			{ key: 'Content-type', value: 'application/json' },
			{ key: 'Test-header', value: 'test-header-value' }
		],
		body: {
			property: 'test',
			property2: 'test 2'
		},
		response: {
			message: 'ok'
		}
	}
})

var ITEM_2 = (exports.ITEM_2 = {
	id: (0, _uuidByString2.default)('POST' + name2),
	name: name2,
	props: {
		path: 'http://localhost:3000/test-endpoint-2',
		method: 'POST'
	}
})

var ITEM_3 = (exports.ITEM_3 = {
	id: (0, _uuidByString2.default)('PATCH' + name3),
	name: name3,
	props: {
		path: '/test-endpoint-3',
		method: 'PATCH',
		protocol: 'http',
		host: 'localhost',
		port: '3000',
		query: 'test=1'
	}
})

var ITEM_4 = (exports.ITEM_4 = {
	id: (0, _uuidByString2.default)('DELETE' + name4),
	name: name4,
	props: {
		path: '/test-endpoint-4',
		method: 'DELETE',
		protocol: 'http',
		host: 'localhost'
	}
})
