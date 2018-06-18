const getUuidByString = require('uuid-by-string')

const FOLDER_1 = { id: getUuidByString('folder 1'), name: 'folder 1' }
const FOLDER_2 = { id: getUuidByString('folder 2'), name: 'folder 2' }
const FOLDER_3 = { id: getUuidByString('folder 3'), name: 'folder 3' }

module.exports = {
	FOLDER_1,
	FOLDER_2,
	FOLDER_3
}
