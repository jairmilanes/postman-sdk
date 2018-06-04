'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _client = require('./client')

var _client2 = _interopRequireDefault(_client)

var _collectionManager = require('./collection-manager')

var _collectionManager2 = _interopRequireDefault(_collectionManager)

var _environmentManager = require('./environment-manager')

var _environmentManager2 = _interopRequireDefault(_environmentManager)

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

var PostmanSdk = {
	Client: _client2.default,
	CollectionManager: _collectionManager2.default,
	EnvironmentManager: _environmentManager2.default
} /** @ignore */

exports.default = PostmanSdk
