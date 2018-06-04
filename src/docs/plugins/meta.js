/**
 * InvalidViewMetaTagValueError Factory
 *
 * @param {Error} lastError The originally thrown exception
 * @returns {InvalidViewMetaTagValueError} An instance of the InvalidViewMetaTagValueError
 */
const invalidValueError = lastError => {
	function InvalidViewMetaTagValueError() {
		this.name = 'InvalidViewMetaTagValue'
		this.message =
			'Error while parsing @viewmeta tag: (' +
			lastError.message +
			'). Make sure your view meta is a valid JSON format.'
		this.stack = lastError.stack
	}

	InvalidViewMetaTagValueError.prototype = new Error()

	return new InvalidViewMetaTagValueError()
}

/**
 * ViewData plugin for JsDoc 3. This simple plugin allows you to add metadata to comments and use those metadada in your custom JSDoc template.
 * @param dictionary
 */
exports.defineTags = function(dictionary) {
	dictionary
		.defineTag('viewmeta', {
			onTagged: function(doclet, tag) {
				try {
					doclet.viewmeta = JSON.parse(tag.value)
					return doclet
				} catch (e) {
					throw invalidValueError(e)
				}
			}
		})
		.synonym('viewmetadata')
}
