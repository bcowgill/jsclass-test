/**
	@file
	File info for set of test objects using augment library to create them.

	@author Brent S.A. Cowgill
	@version  0.0.0
	@license {@link http://unlicense.org The Unlicense}

	@see {@link https://github.com/javascript/augment/wiki/Getting-Started augment Documentation}
	@see {@link http://tinyurl.com/nlvskwr how-to-make-simple-node-js-modules-work-in-the-browser}
*/

(function () {
	'use strict';

	// root = global or window for node/browser
	var root = this,
		augment = root.augment || require('augment'),
		base = 'Classes.Augment.Base',
		Augment = {
			'lib': augment,
			'Thing': augment(
				Object,
				function () {
					var self = this;
					self.constructor = function (name, fixed) {
						Object.defineProperty(this,
							'CONST',
							{
								value: fixed,
								writable: false,
								enumerable: true,
								configurable: false
							});
						this.gname = name;
					};
					self.instMethod = function (param) {
						return this.CONST + ' ' + this.gname + ' ' + param;
					};
				}
			),
			'Base': augment(
				Object,
				function () {
					var self = this,
						_private = 'private';

					// No constructor, so building a namespace object

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
	Augment.thing = new Augment.Thing('thingName', 'CONST');
	//Augment.base = new Augment.Base();

	// Handle node and in browser module exportation
	if ( typeof exports !== 'undefined' )
	{
		if ( typeof module !== 'undefined' && module.exports )
		{
			exports = module.exports = Augment;
		}
		exports.Augment = Augment;
	}
	else
	{
		// In browser we export into window.Classes.Augment
		if (!('Classes' in root))
		{
			root.Classes = {};
		}
		root.Classes.Augment = Augment;
	}
}).call(this);
