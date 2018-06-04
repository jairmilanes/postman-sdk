import { CollectionManager, EnvironmentManager, Client } from '../src/index'

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

const collectionsClient = new Client(
	'collections',
	'258ed6dcc8234050bc3254d2320ce434'
)
const environmentsClient = new Client(
	'environments',
	'258ed6dcc8234050bc3254d2320ce434'
)

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
