if (!process.env.POSTMAN_API_KEY) {
	process.env.POSTMAN_API_KEY = 'IUHSIUHDIUSDIHSDIH'
}

import request from 'request'
import { Collections } from './../index'

const getPostResponseMock = () => ({
	collection: {
		id: '2412a72c-1d8e-491b-aced-93809c0e94e9',
		name: 'TEST COLLECTION',
		uid: '5852-2412a72c-1d8e-491b-aced-93809c0e94e9'
	}
})

const getRequestData = (method, target, params = {}, id = null) => ({
	uri: `/${target}${id ? `/${id}` : ''}`,
	qs: method === 'GET' ? params : {},
	body: method !== 'GET' ? params : {},
	method,
	baseUrl: 'https://api.getpostman.com/',
	json: true,
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Key': process.env.POSTMAN_API_KEY
	}
})

describe('Postman SDK Integration Tests', async () => {
	const target = 'collections'
	const collectionData = {
		info: {
			name: 'TEST COLLECTION',
			description: 'Test Collection Description',
			schema:
				'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
		},
		item: []
	}
	const postResponse = getPostResponseMock()

	it('should perform a post request', async () => {
		request.post = jest.fn((options, callback) =>
			callback(null, {}, getPostResponseMock())
		)
		const results = await Collections.post(collectionData)
		expect(request.post).toHaveBeenCalled()
		expect(request.post).toHaveBeenCalledWith(
			getRequestData('POST', target, collectionData),
			expect.anything()
		)
		expect(results).toMatchObject(getPostResponseMock())
		collectionData.info._postman_id = postResponse.collection.id
	})

	it('should perform a put request', async () => {
		const newTitle = 'TEST PUT COLLECTION'
		const updatedData = { info: { name: newTitle } }
		const putResponse = Object.assign({}, postResponse, {
			collection: { name: newTitle }
		})
		request.put = jest.fn((options, callback) =>
			callback(null, {}, putResponse)
		)
		const putData = Object.assign({}, collectionData, updatedData)
		const results = await Collections.put(putData.info._postman_id, putData)

		expect(request.put).toHaveBeenCalled()
		expect(request.put).toHaveBeenCalledWith(
			getRequestData('PUT', target, putData),
			expect.anything()
		)
		expect(results).toMatchObject(putResponse)
	})

	it('should perform a get request', async () => {
		const getResponse = { test: true }
		request.get = jest.fn((options, callback) =>
			callback(null, {}, getResponse)
		)
		const results = await Collections.get(collectionData.info._postman_id)

		expect(request.get).toHaveBeenCalled()
		expect(request.get).toHaveBeenCalledWith(
			getRequestData('GET', target, {}, collectionData.info._postman_id),
			expect.anything()
		)
		expect(results).toMatchObject(getResponse)
	})

	it('should perform a delete request', async () => {
		const delResponse = { collection: { id: 'JUDHAS', uid: 'JDISHD' } }
		request.delete = jest.fn((options, callback) =>
			callback(null, {}, delResponse)
		)
		const results = await Collections.destroy(
			collectionData.info._postman_id
		)

		expect(request.delete).toHaveBeenCalled()
		expect(request.delete).toHaveBeenCalledWith(
			getRequestData(
				'DELETE',
				target,
				{},
				collectionData.info._postman_id
			),
			expect.anything()
		)
		expect(results).toMatchObject(delResponse)
	})

	it('should return an error on failed requests', async () => {
		const error = new Error('Test Error')
		request.delete = jest.fn((options, callback) =>
			callback(error, undefined, null)
		)

		expect(
			Collections.destroy(collectionData.info._postman_id)
		).rejects.toThrow(error)
	})
})
