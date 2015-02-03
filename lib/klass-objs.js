/**
	@file
	File info for set of test objects using klass library to create them.

	@author Brent S.A. Cowgill
	@version  0.0.0
	@license {@link http://unlicense.org The Unlicense}

	@see {@link https://github.com/ded/klass klass Documentation}
	@see {@link http://tinyurl.com/nlvskwr how-to-make-simple-node-js-modules-work-in-the-browser}
*/

/*jshint maxstatements: 18 */

(function () {
	'use strict';

	// function to define constant values on an object.
	function constants(obj, oConstants, bEnumerable)
	{
		bEnumerable = !!bEnumerable;
		Object.keys(oConstants).forEach(function (constant)
		{
			Object.defineProperty(
				obj,
				constant,
				{
					value: oConstants[constant],
					writable: false,
					enumerable: bEnumerable,
					configurable: false
				}
			);
		});
	}

	// find the class constructor of an object
	// call a static method:
	// getClassOf(obj).staticMethod();
	function getClassOf(obj)
	{
		return Object.getPrototypeOf(obj).constructor;
	}

	// get a static property from an object
	// i.e. get the value from the Class of the object
	// instead of the object or its prototype
	function getStaticOf(obj, staticProp)
	{
		return getClassOf(obj)[staticProp];
	}

	// root = global or window for node/browser
	var root = this,
		klass = root.klass || require('klass'),
		base = 'Classes.Klass.Base',
		Klass = {
			'lib': klass,
			'constants': constants,
			'getClassOf': getClassOf,
			'getStaticOf': getStaticOf,
			'Thing': klass(
				function (name, fixed) {
					// create enumerable constant
					constants(this,
						{ 'CONST': fixed },
						true
					);
					this.gname = name;
				}
			).statics({
				'staticValue': 'STATIC',
				'staticMethod': function (param) {
					// this refers to the class Thing in here
					// not any instance of it.
					// console.dir(this);
					return 'staticMethod(' + param + ') sees ' + this.staticValue;
				}
			}).methods({
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
	Klass.thing = new Klass.Thing('thingName', 'CONST');
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
