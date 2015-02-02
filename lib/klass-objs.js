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
			'Thing': klass(
				function (name) {
					this.CONST = 'CONST';
					this.gname = name;
				}
			).methods({
				'instMethod':  function (param) {
					return this.CONST + ' ' + this.gname + ' ' + param;
				}
			}),
			'Base': klass(
				function () {
					var _private = 'private';
					void _private;
				})
				.statics({
					klassName: base,
					baseClassMethod: function() {
						return base + '.baseClassMethod()';
					},
					method: function () {
						return this.klassName + '.method()';
					}
				}),
			};
	Klass.thing = new Klass.Thing('thingName');
	Klass.base = new Klass.Base();

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
