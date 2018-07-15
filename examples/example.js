// This is an example of how to use the Postman SDK to
// programmatically create collections in your Postman
// account. This can be used to automate your collections
// creation on postman for testing or development purpose.

const PostmanSDK = require('../dist/index')

// Just to make it cleaner down here
const Client = PostmanSDK.Client
const EnvironmentManager = PostmanSDK.EnvironmentManager
const CollectionManager = PostmanSDK.CollectionManager

// Create your environments
const dev = new EnvironmentManager('dev')
const staging = new EnvironmentManager('staging')
const production = new EnvironmentManager('production')

// Create your collection
const collection = new CollectionManager('My Collection', '1.0.0')

// Instantiate the API clients
const API_KEY = 'f21a2bb08f334fc4b7dc11143cfabf5d'
const collectionsClient = new Client('collections', API_KEY)
const environmentsClient = new Client('environments', API_KEY)

// Add your variables to each of your environments
dev.add('HOST', 'dev.myhost.com', 'string', true)
dev.add('PORT', null, 'number', true)
dev.add('PROTOCOL', 'http', 'string', true)
staging.add('HOST', 'staging.myhost.com', 'string', true)
staging.add('PORT', null, 'number', true)
staging.add('PROTOCOL', 'https', 'string', true)
production.add('HOST', 'myhost.com', 'string', true)
production.add('PORT', null, 'number', true)
production.add('PROTOCOL', 'https', 'string', true)

// Add request items to your collection using a property object
collection.item.add('Endpoint One', {
	path: '/endpoint-one',
	method: 'GET',
	host: '{{HOST}}',
	port: '{{PORT}}',
	protocol: '{{PROTOCOL}}'
})

// Add a new folder to your collection
collection.item.addFolder('Folder One')

// Add an item to the new folder
collection.item.addToFolder('Folder One', 'Endpoint Two', {
	path: '/endpoint-two',
	method: 'POST',
	host: '{{HOST}}',
	port: '{{PORT}}',
	protocol: '{{PROTOCOL}}'
})

// Find a request item
const item = collection.item.find('Endpoint Two')

// Add headers to your request item
item.request.header.add('Content-type', 'application/json')

// Add a request event
item.event.add({
	name: 'My Event',
	listen: 'prerequest',
	disabled: false,
	type: 'text/javascript',
	exec: ['script one', 'script two'],
	source: 'https://my-server.com/my-script.js'
})

// All good! Let´s send it to Postman Cloud
Promise.all([
	environmentsClient.post(dev.toJSON()),
	environmentsClient.post(staging.toJSON()),
	environmentsClient.post(production.toJSON()),
	collectionsClient.post(collection.toJSON())
]).then(results => {
	console.log(results)
	// Done! All your collections should be visible in the Postman UI
})
