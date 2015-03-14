/**
	@file test/class-test.js
	@author Brent S.A. Cowgill
	@requires augment
	@requires chai
	@requires mocha

	@description
	Test plan for JavaScript objeect libararies {@link module:augment} module (chai)

	@see {@link http://chaijs.com/api/ Chai API Documentation}
	@see {@link http://visionmedia.github.io/mocha/ Mocha Documentation}
*/
/*jshint node: true, indent: 4, smarttabs: true, maxlen: 128, maxstatements: false */
/*global window, beforeEach, describe, it */
'use strict';

var isNode = typeof process === 'object' && process + '' === '[object process]',
	dump = function (n, o) { console.log(n, isNode ? require('util').inspect(o) : o); },
	chai = chai || require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should(), // note function call here
	Classes = !isNode ? window.Classes : {
		'Javascript' : require('../lib/javascript-objs'),
		'Augment': require('../lib/augment-objs'),
		'Klass':   require('../lib/klass-objs')
	},
	XXX = {
		do: function (s) { return s.toUpperCase(); },
		die: function(s) { throw(new Error(s)); }
	},//require('../lib/XXX'),
	MUSTDO = function () { it('MUSTDO test something'); };

chai.config.includeStack = true;   // turn on stack trace on assertion failure
chai.config.showDiff = false;      // turn off reporter diff display
chai.config.truncateThreshold = 0; // disable truncating actual/expected values

dump('Classes', Classes);
//dump('prototypes', Classes.Klass.getPrototypesOf(Classes.Klass.thing));
//dump('ancestors', Classes.Klass.getAncestorsOf(Classes.Klass.thing));

function testPropGen()
{
	describe('Javascript.lib.constant() - make constants on object', function()
	{
		var make = Classes.Javascript.lib;
		it('constant({}, key, value) should define visible constant by default', function () {
			var obj = make.constant({}, 'constant', 42);
			expect(	obj.constant).to.equal(42);
			expect(Object.keys(obj)).to.deep.equal(['constant']);
			assert.throws(
				function () { obj.constant = 23; },
				/Cannot assign to read only property/);
			expect(obj.constant).to.equal(42);
		});
		it('constant({}, false, key, value) should define invisible constant', function () {
			var obj = make.constant({}, false, 'constant', 48);
			expect(	obj.constant).to.equal(48);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
		it('constant({}, true, key, value) should define visible constant explicitly', function () {
			var obj = make.constant({}, true, 'constant', 148);
			expect(	obj.constant).to.equal(148);
			expect(Object.keys(obj)).to.deep.equal(['constant']);
		});
		it('constant({}, key, value, ...) should define multiple visible constants by arguments', function () {
			var obj = make.constant(
				{},
				'constant', 42,
				'CONST', 88);
			expect(	obj.CONST).to.equal(88);
			expect(Object.keys(obj)).to.deep.equal(['constant', 'CONST']);
		});
		it('constant({}, key, value, ...) should handle odd number of arguments', function () {
			var obj = make.constant(
				{},
				'constant', 42,
				'CONST');
			expect(	obj.CONST).to.equal(void 0);
			expect(Object.keys(obj)).to.deep.equal(['constant', 'CONST']);
		});
		it('constant({}, [ key, value, ...]) should define multiple visible constants by array', function () {
			var obj = make.constant(
				{},
				[
					'constant', 1242,
					'CONST', 1288
				]);
			expect(	obj.CONST).to.equal(1288);
			expect(Object.keys(obj)).to.deep.equal(['constant', 'CONST']);
		});
		it('constant({}, { key: value, ...}) should define multiple visible constants by object', function () {
			var obj = make.constant(
				{},
				{
					'constant': 142,
					'CONST': 188
				});
			expect(	obj.CONST).to.equal(188);
			expect(Object.keys(obj)).to.deep.equal(['constant', 'CONST']);
		});
		it('constant({}, false, { key: value, ...}) should define multiple invisible constants by object', function () {
			var obj = make.constant(
				{},
				false,
				{
					'constant': 1421,
					'CONST': 1881
				});
			expect(	obj.CONST).to.equal(1881);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
		it('constant({}, false, [ key, value, ...]) should define multiple invisible constants by array', function () {
			var obj = make.constant(
				{},
				false,
				[
					'constant', 12042,
					'CONST', 12088
				]);
			expect(	obj.CONST).to.equal(12088);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
	});

	describe('Javascript.lib.property() - make properties on object', function()
	{
		var make = Classes.Javascript.lib;
		it('property({}, key, value) should define visible property by default', function () {
			var obj = make.property({}, 'property', 42);
			expect(	obj.property).to.equal(42);
			expect(Object.keys(obj)).to.deep.equal(['property']);
			assert.doesNotThrow(
				function () { obj.property = 23; },
				/Cannot assign to read only property/);
			expect(obj.property).to.equal(23);
		});
		it('property({}, key, { prop desc }) should define visible property with get/set', function () {
			var obj = make.property(
				{ '_prop': 52 },
				'property',
				{
					get: function () { return this._prop; },
					set: function (value) { this._prop = value > 10 ? 10 : value; }
				}
			);
			expect(	obj.property).to.equal(52);
			expect(Object.keys(obj)).to.deep.equal(['_prop', 'property']);
			assert.doesNotThrow(
				function () { obj.property = 23; },
				/Cannot assign to read only property/);
			expect(obj.property).to.equal(10);
		});
		it('property({}, false, key, value) should define invisible property', function () {
			var obj = make.property({}, false, 'property', 48);
			expect(	obj.property).to.equal(48);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
		it('property({}, true, key, value) should define visible property explicitly', function () {
			var obj = make.property({}, true, 'property', 148);
			expect(	obj.property).to.equal(148);
			expect(Object.keys(obj)).to.deep.equal(['property']);
		});
		it('property({}, key, value, ...) should define multiple visible properties by arguments', function () {
			var obj = make.property(
				{},
				'property', 42,
				'PROP', 88);
			expect(	obj.PROP).to.equal(88);
			expect(Object.keys(obj)).to.deep.equal(['property', 'PROP']);
		});
		it('property({}, key, value, ...) should handle odd number of arguments', function () {
			var obj = make.property(
				{},
				'property', 42,
				'PROP');
			expect(	obj.PROP).to.equal(void 0);
			expect(Object.keys(obj)).to.deep.equal(['property', 'PROP']);
		});
		it('property({}, [ key, value, ...]) should define multiple visible properties by array', function () {
			var obj = make.property(
				{},
				[
					'property', 1242,
					'PROP', 1288
				]);
			expect(	obj.PROP).to.equal(1288);
			expect(Object.keys(obj)).to.deep.equal(['property', 'PROP']);
		});
		it('property({}, { key: value, ...}) should define multiple visible properties by object', function () {
			var obj = make.property(
				{},
				{
					'property': 142,
					'PROP': 188
				});
			expect(	obj.PROP).to.equal(188);
			expect(Object.keys(obj)).to.deep.equal(['property', 'PROP']);
		});
		it('property({}, false, { key: value, ...}) should define multiple invisible properties by object', function () {
			var obj = make.property(
				{},
				false,
				{
					'property': 1421,
					'PROP': 1881
				});
			expect(	obj.PROP).to.equal(1881);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
		it('property({}, false, [ key, value, ...]) should define multiple invisible properties by array', function () {
			var obj = make.property(
				{},
				false,
				[
					'property', 12042,
					'PROP', 12088
				]);
			expect(	obj.PROP).to.equal(12088);
			expect(Object.keys(obj)).to.deep.equal([]);
		});
	});
} // testPropGen()

testPropGen();

function testProperties(libName, nameSpaceName, nameSpace)
{
	var base = nameSpaceName + '.Property',
		obj = nameSpace.Property;

	describe(libName, function()
	{
		describe(base, function()
		{
			var aKeys = [
				'normal',
				'visibleConstant',
				'visibleLimited',
				'visibleSticky'
			];
			var aProps = [
				'constant',
				'deletableConstant',
				'normal',
				'visibleConstant',
				'visibleLimited',
				'visibleSticky'
			];
			it('should be object', function () {
				expect(obj).to.be.a('object');
			});
			it('should have keys ' + aKeys.join(', '), function () {
				expect(Object.keys(obj).sort()).to.deep.equal(aKeys);
			});
			it('should have properties ' + aProps.join(', '), function () {
				expect(Object.getOwnPropertyNames(obj).sort()).to.deep.equal(aProps);
			});

			describe('constants', function()
			{
				it('constant should be an own property', function () {
					expect(obj.hasOwnProperty('constant')).to.equal(true);
				});
				it('constant should be 54', function () {
					expect(obj.constant).to.equal(54);
				});
				it('constant should not be writable', function () {
					assert.throws(
						function () { obj.constant = 23; },
						/Cannot assign to read only property/);
					expect(obj.constant).to.equal(54);
				});
				it('constant should not be deletable', function () {
					assert.throws(
						function () { delete obj.constant; },
						/Cannot delete property/);
					expect(obj.constant).to.equal(54);
				});

				it('visibleConstant should be an own property', function () {
					expect(obj.hasOwnProperty('visibleConstant')).to.equal(true);
				});
				it('visibleConstant should be 48', function () {
					expect(obj.visibleConstant).to.equal(48);
				});

				it('deletableConstant should be an own property', function () {
					expect(obj.hasOwnProperty('deletableConstant')).to.equal(true);
				});
				it('deletableConstant should be 96', function () {
					expect(obj.deletableConstant).to.equal(96);
				});
				it('deletableConstant should be deletable', function () {
					assert.doesNotThrow(
						function () { delete obj.deletableConstant; },
						/Cannot delete property/);
					expect(obj.deletableConstant).to.equal(void 0);
				});
			});

			describe('writables', function()
			{
				it('normal should be 42', function () {
					expect(obj.normal).to.equal(42);
				});
				it('normal should be writable', function () {
					obj.normal = 32;
					expect(obj.normal).to.equal(32);
				});
				it('normal should be an own property', function () {
					expect(obj.hasOwnProperty('normal')).to.equal(true);
				});

				it('should add property', function () {
					obj.added = 12;
					expect(obj.added).to.equal(12);
				});
				it('should remove property', function () {
					delete obj.added;
					expect(obj.added).to.equal(void 0);
				});
				it('should have keys ' + aKeys.join(', ') + ' after delete', function () {
					expect(Object.keys(obj).sort()).to.deep.equal(aKeys);
				});

				it('visibleSticky should be an own property', function () {
					expect(obj.hasOwnProperty('visibleSticky')).to.equal(true);
				});
				it('visibleSticky should be 84', function () {
					expect(obj.visibleSticky).to.equal(84);
				});
				it('visibleSticky should be writable', function () {
					obj.visibleSticky = 321;
					expect(obj.visibleSticky).to.equal(321);
				});
				it('visibleSticky should not be deletable', function () {
					assert.throws(
						function () { delete obj.visibleSticky; },
						/Cannot delete property/);
					expect(obj.visibleSticky).to.equal(321);
				});

				it('visibleLimited should be an own property', function () {
					expect(obj.hasOwnProperty('visibleLimited')).to.equal(true);
				});
				it('visibleLimited should be 55', function () {
					expect(obj.visibleLimited).to.equal(55);
				});
				it('visibleLimited should be writable', function () {
					obj.visibleLimited = 1;
					expect(obj.visibleLimited).to.equal(1);
				});
				it('visibleLimited should be limited in value by settor function', function () {
					obj.visibleLimited = 123;
					expect(obj.visibleLimited).to.equal(100);
				});
				it('visibleLimited should not be deletable', function () {
					assert.throws(
						function () { delete obj.visibleLimited; },
						/Cannot delete property/);
					expect(obj.visibleLimited).to.equal(100);
				});
			});

		});
	});

}

testProperties('javascript', 'Classes.Javascript', Classes.Javascript);


function testThingClass(libName, nameSpaceName, nameSpace)
{
	var base = nameSpaceName + '.Thing',
		obj = nameSpace.Thing,
		typeName = 'function';

	describe(libName, function()
	{
		describe(base, function()
		{
			it('should be ' + typeName, function () {
				expect(obj).to.be.a(typeName);
			});
			it('should be instanceof Object', function () {
				expect(obj).to.be.instanceof(Object);
			});
			it('should hide private vars', function () {
				should.not.exist(obj._private);
			});
			it('should have public klassName ' + base, function () {
				expect(obj.klassName).to.be.equal(base);
			});
			it('should have public baseClassMethod()', function () {
				expect(obj.baseClassMethod()).to.be.equal(base + '.baseClassMethod()');
			});
			it('should have public method()', function () {
				expect(obj.method()).to.be.equal(base + '.method()');
			});
		});
	});
}

function testThingInstance(libName, nameSpaceName, nameSpace)
{
	var Class = nameSpace.Thing,
		className = nameSpaceName + '.Thing',
		obj = nameSpace.thing;

	describe(libName, function()
	{
		describe('instance of ' + className, function()
		{
			it('should be object', function () {
				expect(obj).to.be.an('object');
			});
			it('should be instanceof Object', function () {
				expect(obj).to.be.instanceof(Object);
			});
			it('Object.getPrototypeOf(thing) should be ' + className + '.prototype', function () {
				expect(Object.getPrototypeOf(obj)).to.be.equal(Class.prototype);
			});
			it(className + '.prototype.isPrototypeOf(thing) should be true', function () {
				expect(Class.prototype.isPrototypeOf(obj)).to.be.true();
			});

			it('thing.CONST should be CONST', function () {
				expect(obj.CONST).to.equal('CONST');
			});
			it('thing.CONST should be unchangeable', function () {
				should.Throw(
					function () {
						obj.CONST = 'NOTCONST';
					},
					TypeError,
					/Cannot assign to read only property 'CONST'/
				);
				expect(obj.CONST).to.equal('CONST');
			});
			it('thing.gname should be thingName', function () {
				expect(obj.gname).to.equal('thingName');
			});
			it('thing.gname should be changeable', function () {
				obj.gname = 'changedName';
				expect(obj.gname).to.equal('changedName');
				obj.gname = 'thingName';
				expect(obj.gname).to.equal('thingName');
			});
			it('thing.instMethod should be function', function () {
				expect(obj.instMethod).to.be.a('function');
			});
			it('thing.instMethod(what) should be CONST thingName what', function () {
				expect(obj.instMethod('what')).to.be.equal('CONST thingName what');
			});
		});
	});
}

function testBase(libName, nameSpaceName, nameSpace, typeName)
{
	var base = nameSpaceName + '.Base',
		obj = nameSpace.Base;
	typeName = typeName || 'object';

	describe(libName, function()
	{
		describe(base, function()
		{
			it('should be ' + typeName, function () {
				expect(obj).to.be.a(typeName);
			});
			it('should be instanceof Object', function () {
				expect(obj).to.be.instanceof(Object);
			});
			it('should hide private vars', function () {
				should.not.exist(obj._private);
			});
			it('should have public klassName ' + base, function () {
				expect(obj.klassName).to.be.equal(base);
			});
			it('should have public CONST ' + base, function () {
				expect(obj.CONST).to.be.equal('CONST');
			});
			it('static CONST should be unchangeable', function () {
				should.Throw(
					function () {
						obj.CONST = 'NOTCONST';
					},
					TypeError,
					/Cannot assign to read only property 'CONST'/
				);
				expect(obj.CONST).to.equal('CONST');
			});
			it('should have public baseClassMethod()', function () {
				expect(obj.baseClassMethod()).to.be.equal(base + '.baseClassMethod()');
			});
			it('should have public method()', function () {
				expect(obj.method()).to.be.equal(base + '.method()');
			});
		});
	});
}

function testBaseInstance(libName, nameSpaceName, nameSpace, typeName)
{
	var base = nameSpaceName + '.Base',
		Obj = nameSpace.Base,
		inst = new Obj();
	typeName = typeName || 'object';

	describe(libName, function()
	{
		describe('instance of ' + base, function()
		{
			it('should be ' + typeName, function () {
				expect(inst).to.be.a(typeName);
			});
			it('should be instanceof Object', function () {
				expect(inst).to.be.instanceof(Object);
			});
			it('should hide private vars', function () {
				should.not.exist(inst._private);
			});
			it('should have public klassName ' + base, function () {
				expect(inst.klassName).to.be.equal(base);
			});
			it('should have public baseClassMethod()', function () {
				expect(inst.baseClassMethod()).to.be.equal(base + '.baseClassMethod()');
			});
			it('should have public method()', function () {
				expect(inst.method()).to.be.equal(base + '.method()');
			});
		});
	});
}

if (false) {
	testBase('augment', 'Classes.Augment', Classes.Augment);
	testBase('klass',   'Classes.Klass',   Classes.Klass, 'function');

	testThingClass('augment', 'Classes.Augment', Classes.Augment);
	testThingClass('klass', 'Classes.Klass', Classes.Klass);
	testThingInstance('augment', 'Classes.Augment', Classes.Augment);
	testThingInstance('klass', 'Classes.Klass', Classes.Klass);

	void testBaseInstance;
	//testBaseInstance('augment', 'Classes.Augment', Classes.Augment);
	//testBaseInstance('klass',   'Classes.Klass',   Classes.Klass);
}

if (false) {
	beforeEach(function()
	{
		// setup code before every test
	});

	describe('#XXX', function ()
	{
		describe('.method()', function()
		{
			it('.should do something useful', function() {
				XXX.do('something useful').should.equal('SOMETHING USEFUL');
			});
			it('assert.throws an error', function() {
				assert.throws(function () { XXX.die('horribly and slow'); });
			});
			it('assert.throws an error matching regex', function() {
				assert.throws(
					function () { XXX.die('horribly and slow'); },
					/slow/);
			});
			it('should.throw an error matching regex', function() {
				should.Throw(
					function () { XXX.die('horribly and slow'); },
					/slow/);
			});
			it('expect.to.match found within an array', function() {
				expect(
					['string in array', 'does it match?'],
					'does .match() look in array elements?').to.match(/match/);
			});

			it('no callback is a pending test.');
			it.skip('SKIPPED TEST does something useful', function() {
				XXX.do('with data').should.equal('something useful');
			});
		});

		describe.skip('SKIPPED SUITE .method()', function()
		{
			it('does something useful', function() {
				XXX.do('with data').should.equal('something useful');
			});
		});

		describe('IMPLEMENT THIS suite', MUSTDO);
	});
}

/*
	======== A Handy Big Chai Test Reference ========
	http://chaijs.com/guide/styles/
	http://chaijs.com/api/bdd/
	http://visionmedia.github.io/mocha/

	Install / Use
		npm install -r mocha
		npm install chai --save-dev
		mocha --reporter spec  # add to package.json/scripts/test
		mocha --reporter nyan
		mocha --reporters      # list supported output reporters
		npm test

	Test suites:
		describe(suite, fn);
		it(tests, fn);
		xdescribe(suite, fn); // test marked pending and skips execution
		xit(tests, fn);

	Test assertions:
		assert(expression, [message]);
		assert.fail(actual, expected, [message], [operator]);
		assert.ok(actual, [message]); // truthy
		assert.notOk(actual, [message]); // falsy
		assert.equal(actual, expected, [message]);              // ==
		assert.notEqual(actual, expected, [message]);
		assert.strictEqual(actual, expected, [message]);        // ===
		assert.notStrictEqual(actual, expected, [message]);
		assert.operator(actual, operator, expected, [message]); // < > etc
		assert.closeTo(actual, expected, delta, [message]);
		TODO closeTopercent(actual, expected, percent, delta, [message]) add with plugin utilities
		assert.match(actual, regex, [message]); // string or array
		assert.notMatch(actual, regex, [message]);
		// object or array
		assert.deepEqual(actual, expected, [message]);
		assert.notDeepEqual(actual, expected, [message]);
		assert.lengthOf(actual, length, [message]);     // string or array length
		assert.include(haystack, needle, [message]);    // string or array contains
		assert.notInclude(haystack, needle, [message]); // string or array contains
		assert.property(actual, property, [message]);
		assert.notProperty(actual, property, [message]);
		assert.deepProperty(actual, property, [message]);    // property supports dot.notation[idx]
		assert.notDeepProperty(actual, property, [message]); // property supports dot.notation[idx]
		assert.propertyVal(actual, property, value, [message]);
		assert.propertyNotVal(actual, property, value, [message]);
		assert.deepPropertyVal(actual, property, value, [message]);    // property supports dot.notation
		assert.deepPropertyNotVal(actual, property, value, [message]); // property supports dot.notation
		assert.sameMembers(actual, expected, [message]);    // arrays ignore order of values
		assert.includeMembers(actual, expected, [message]); // array subset is included
		// exceptions
		// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
		assert.throw/throws/Throw(fn, [constructor/string/regexp], [string/regexp], [message]);
		assert.doesNotThrow(fn, [constructor/regexp], [message]);
		// objects/types
		assert.typeOf(actual, type, [message]);
		assert.notTypeOf(actual, type, [message]);
		assert.instanceOf(actual, constructor, [message]);
		assert.notInstanceOf(actual, constructor, [message]);
		assert.isTrue(actual, [message]);  // actual true
		assert.isFalse(actual, [message]); // actual false
		assert.isNull(actual, [message]);
		assert.isNotNull(actual, [message]);
		assert.isUndefined(actual, [message]);
		assert.isDefined(actual, [message]);
		assert.isFunction(actual, [message]);
		assert.isNotFunction(actual, [message]);
		assert.isObject(actual, [message]);
		assert.isNotObject(actual, [message]);
		assert.isArray(actual, [message]);
		assert.isNotArray(actual, [message]);
		assert.isString(actual, [message]);
		assert.isNotString(actual, [message]);
		assert.isNumber(actual, [message]);
		assert.isNotNumber(actual, [message]);
		assert.isBoolean(actual, [message]);
		assert.isNotBoolean(actual, [message]);
	Plugin Utilities
		 http://chaijs.com/guide/helpers
		TODO type(object)

	BDD Style
	Chains allowed for expect and should
		.to .be .been .is .that .and .has .have .with .at .of .same
		.not .deep
	Ends allowed for expect and should
		.ok .true .false .null .undefined .exist .empty
		.arguments // is a function arguments object
		.a/an(type)
		.equal(value)
		.eql(value) // deep equal
		.closeTo(value, delta)
		// TODO closeToPercent(value, percent, delta)
		.above(value)
		.below(value)
		.least(value) // also chain with .length.of.at.least()
		.most(value)
		.within(min, max)  // also chain with length.within()
		.include/contain(value)
		.include/contain.keys(key1, [key2], ...)
		.instanceof(constructor)
		.property(name, [value])
		.ownProperty(name)
		.deep.property(name, [value]) // supports dot.notation[idx]
		.length(value) // string or array
		.match(regex)
		.string(substr) // .to.have.string(...)
		.have.keys(key1, [key2], ...)
		.contain.keys(key1, [key2], ...)
		.members(set) // .include.members() .have.members() .deep.include.members()
		.throw(constructor)
		.throw(constructor).and.not.throw(/error message/)
TODO		.respondTo(method) // object/class has method (or prototype chain)
TODO		.itself.to.respondTo(method) // has static method (not through prototype chain)
		.satisfy(fn) // function evaluate true when passed the object under test

	Test expectations: (node and browsers)
		expect(actual, [message]).to.be.a(type);
		expect(actual, [message]).to.equal(expected);
		expect(actual, [message]).to.have.length(length);
		expect(actual, [message]).to.have.property(property).with.length(length);

	Test should: (node and non IE browsers)
		should.exist(actual);
		should.not.exist(actual); // to handle null/undefined
		should.equal(expected);
		should.not.equal(expected);
		should.throw/Throw([constructor/string/regexp], [string/regexp]);
		should.not.throw/Throw([constructor/string/regexp], [string/regexp]);
		actual.should.be.a(type);
		actual.should.be.an(type);
		actual.should.equal(expected);
		actual.should.not.equal(expected);
		actual.should.have.length(length);
		actual.should.have.property(property).with.length(length);
*/
