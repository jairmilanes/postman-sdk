const PostmanSDK = require('../dist/index').default

const Client = PostmanSDK.Client
const EnvironmentManager = PostmanSDK.EnvironmentManager
const CollectionManager = PostmanSDK.CollectionManager

const dev = new EnvironmentManager('dev')
const staging = new EnvironmentManager('staging')
const production = new EnvironmentManager('production')

dev.add('HOST', 'dev.myhost.com', 'string', true)
dev.add('PORT', 3000, 'number', true)
dev.add('PROTOCOL', 'http', 'string', true)

staging.add('HOST', 'staging.myhost.com', 'string', true)
staging.add('PORT', null, 'number', true)
staging.add('PROTOCOL', 'https', 'string', true)

production.add('HOST', 'myhost.com', 'string', true)
production.add('PORT', null, 'number', true)
production.add('PROTOCOL', 'https', 'string', true)

const collection = new CollectionManager('My Collection', '1.0.0')

// Add request item to collection using a full url as path
collection.item.add('Endpoint One', {
	path: '/endpoint-one',
	method: 'GET',
	host: '{{HOST}}',
	port: '{{PORT}}',
	protocal: '{{PROTOCOL}}'
})

// Add a new folder
collection.item.addFolder('Folder One')

// Add an item to folder
collection.item.addToFolder('Folder One', 'Endpoint Two', {
	path: '/endpoint-two',
	method: 'POST',
	host: '{{HOST}}',
	port: '{{PORT}}',
	protocal: '{{PROTOCOL}}'
})

const item = collection.item.find('Endpoint Two')

console.log('EVENT', item.event)
console.log('HEADERS', item.request.headers)

item.request.headers.add('Content-type', 'application/json')

item.event.add({
	name: 'My Event',
	listen: 'prerequest',
	disabled: false,
	type: 'text/javascript',
	exec: ['script one', 'script two'],
	source: 'https://my-server.com/my-script.js'
})

const collectionsClient = new Client(
	'collections',
	'258ed6dcc8234050bc3254d2320ce434'
)
const environmentsClient = new Client(
	'environments',
	'258ed6dcc8234050bc3254d2320ce434'
)

console.log('DEV ENV', dev.toJSON())
console.log('COLLECTION', collection.toJSON())

Promise.all([
	environmentsClient.post(dev.toJSON()),
	environmentsClient.post(staging.toJSON()),
	environmentsClient.post(production.toJSON()),
	collectionsClient.post(collection.toJSON())
]).then(results => {
	console.log(results)
	// results will be an array with each of the promises responses
	// For the sake of simplicity I won't be checking for errors but you should!
})
