/**
	@file
	File info for set of test objects using plain Javascript to create them.

	@author Brent S.A. Cowgill
	@version  0.0.0
	@license {@link http://unlicense.org The Unlicense}

	@see {@link http://www.w3schools.com/js/js_properties.asp Javascript Properties Documentation}
	@see {@link http://tinyurl.com/nlvskwr how-to-make-simple-node-js-modules-work-in-the-browser}
*/
/*jshint maxstatements: false */
(function () {
	'use strict';

	// root = global or window for node/browser
	var root = this,
		wrap = function (def) {
			return function (obj, oProps) {
				/* jshint maxcomplexity: 6 */
				var enumerable = true,
					idx = 1,
					list = arguments;
				if (typeof oProps === 'boolean')
				{
					enumerable = oProps;
					idx = 2;
					oProps = arguments[idx];
				}
				if (!Array.isArray(oProps) && typeof oProps === 'object')
				{
					Object.keys(oProps).forEach(
						function (key) {
							def(obj, key, oProps[key], enumerable);
						});
				}
				else
				{
					// handle passing in an array ref
					if (Array.isArray(oProps)) {
						list = oProps;
						idx = 0;
					}
					// handle key, val, key, val even if last val missing
					for (; idx + 1 < list.length; idx += 2)
					{
						def(obj, list[idx], list[idx + 1], enumerable);
					}
					if (idx < list.length)
					{
						def(obj, list[idx], void 0, enumerable);
					}
				}
				return obj;
			};
		}, // wrap()
		Javascript = {
			lib: {
				// constant({}, name, value); // define a visible constant
				// multiple invisible constants defined
				// constant({}, false, name1, val1, name2, val2)
				// constant({}, false, { name1: val1, name2: val2 })
				constant: wrap(function(obj, key, value, enumerable) {
					Object.defineProperty(
						obj,
						key,
						{
							'writable': false,
							'value': value,
							'enumerable': enumerable
						});
				})
			},
			Property: {
				normal: 42
			}
		};

	// Attach properties to Property
	Object.defineProperty(
		Javascript.Property,
		'constant',
		{
			value: 54
		}
	);
	Object.defineProperty(
		Javascript.Property,
		'visibleConstant',
		{
			value: 48,
			enumerable: true // makes property show in keys()
		}
	);
	Object.defineProperty(
		Javascript.Property,
		'deletableConstant',
		{
			value: 96,
			configurable: true // makes property deletable
		}
	);
	Object.defineProperty(
		Javascript.Property,
		'visibleSticky',
		{
			value: 84,
			writable: true, // can change value
			enumerable: true // makes property show in keys()
		}
	);
	var _visibleLimited = 55;
	Object.defineProperty(
		Javascript.Property,
		'visibleLimited',
		{
			get: function () { return _visibleLimited; },
			set: function (value) { _visibleLimited = value > 100 ? 100 : value; },
			enumerable: true // makes property show in keys()
		}
	);

	// Handle node and in browser module exportation
	if ( typeof exports !== 'undefined' )
	{
		if ( typeof module !== 'undefined' && module.exports )
		{
			exports = module.exports = Javascript;
		}
		exports.Javascript = Javascript;
	}
	else
	{
		// In browser we export into window.Classes.Javascript
		if (!('Classes' in root))
		{
			root.Classes = {};
		}
		root.Classes.Javascript = Javascript;
	}
}).call(this);
