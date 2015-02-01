/**
	@file
	File info for set of test objects using klass library to create them.

	@author Brent S.A. Cowgill
	@version  0.0.0
	@license {@link http://unlicense.org The Unlicense}

	@see {@link https://github.com/ded/klass klass Documentation}
	@see {@link http://tinyurl.com/nlvskwr how-to-make-simple-node-js-modules-work-in-the-browser}
*/

(function () {
	'use strict';

	// root = global or window for node/browser
	var root = this,
		klass = root.klass || require('klass'),
		base = 'Classes.Klass.Base',
		Klass = {
			'lib': klass,
			'Base': klass(
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
				})
		};

	// Handle node and in browser module exportation
	if ( typeof exports !== 'undefined' )
	{
		if ( typeof module !== 'undefined' && module.exports )
		{
			exports = module.exports = Klass;
		}
		exports.Klass = Klass;
	}
	else
	{
		// In browser we export into window.Classes.Klass
		if (!('Classes' in root))
		{
			root.Classes = {};
		}
		root.Classes.Klass = Klass;
	}
}).call(this);
