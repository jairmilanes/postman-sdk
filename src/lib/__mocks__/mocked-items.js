import getUuidByString from 'uuid-by-string'

const name1 = 'test-endpoint'
const name2 = 'test-endpoint-2'
const name3 = 'test-endpoint-3'
const name4 = 'test-endpoint-4'

export const ITEM_1 = {
	id: getUuidByString('GET' + name1),
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
}

export const ITEM_2 = {
	id: getUuidByString('POST' + name2),
	name: name2,
	props: {
		path: 'http://localhost:3000/test-endpoint-2',
		method: 'POST'
	}
}

export const ITEM_3 = {
	id: getUuidByString('PATCH' + name3),
	name: name3,
	props: {
		path: '/test-endpoint-3',
		method: 'PATCH',
		protocol: 'http',
		host: 'localhost',
		port: '3000',
		query: 'test=1'
	}
}

export const ITEM_4 = {
	id: getUuidByString('DELETE' + name4),
	name: name4,
	props: {
		path: '/test-endpoint-4',
		method: 'DELETE',
		protocol: 'http',
		host: 'localhost'
	}
}
