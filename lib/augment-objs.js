/**
	@file
	File info for set of test objects using augment library to create them.

	@author Brent S.A. Cowgill
	@version  0.0.0
	@license {@link http://unlicense.org The Unlicense}

	@see {@link https://github.com/javascript/augment/wiki/Getting-Started augment Documentation}
*/

'use strict';

module.exports = {};
var augment = augment || require('augment'),
	base = 'Classes.Augment.Base';

module.exports.Base = augment(
	Object,
	function () {
		var self = this,
			_private = 'private';
		self.klassName = base;
		self.baseClassMethod = function() {
			return self.klassName + '.baseClassMethod()';
		};
		self.method = function () {
			return this.klassName + '.method()';
		};
		void _private;
	}
);
