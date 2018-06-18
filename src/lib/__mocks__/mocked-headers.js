const HEADER_1 = {
	key: 'Content-Type',
	value: 'application/json'
}

const HEADER_2 = {
	key: 'Accept',
	value: 'application/json'
}

const HEADER_3 = {
	key: 'Authorization',
	value: 'Bearer {{TOKEN}}'
}

const DUMMY_HEADER = {
	key: 'Fake Header',
	value: 'Fake value'
}

module.exports = {
	HEADER_1,
	HEADER_2,
	HEADER_3,
	DUMMY_HEADER
}
