/**
	@file test/class-test.js
	@author Brent S.A. Cowgill
	@requires augment
	@requires chai
	@requires mocha

	@description
	Test plan for {@link module:augment} module (chai)

	@see {@link http://chaijs.com/api/ Chai API Documentation}
	@see {@link http://visionmedia.github.io/mocha/ Mocha Documentation}
*/
/*jshint node: true, indent: 4, smarttabs: true, maxlen: 128 */
/*global window, beforeEach, describe, it */
'use strict';

/*
	======== A Handy Little Mocha/Chai Test Reference ========
	http://chaijs.com/guide/styles/
	http://chaijs.com/api/bdd/
	http://visionmedia.github.io/mocha/

	Test suites (mocha):
		describe(suite, [fn]);  // omitting function marks it as a pending suite/spec
		it(tests, [fn]);
		describe/it.only(description, fn) // run only one test/case
		describe/it.skip(suite, fn); // test marked pending and skips execution
		before(fn);
		after(fn);
		beforeEach(fn);
		afterEach(fn);

	Test assertions:
		assert.ok(actual, [message]); // truthy
		assert.notOk(actual, [message]); // falsy
		assert.equal(actual, expected, [message]);              // ==
		assert.notEqual(actual, expected, [message]);
		assert.strictEqual(actual, expected, [message]);        // ===
		assert.operator(actual, operator, expected, [message]); // < > etc
		assert.closeTo(actual, expected, delta, [message]);
		TODO closeTopercent(actual, expected, percent, delta, [message]) add with plugin utilities
		assert.match(actual, regex, [message]); // string or array
		// object or array
		assert.deepEqual(actual, expected, [message]);
		assert.lengthOf(actual, length, [message]);     // string or array length
		assert.include(haystack, needle, [message]);    // string or array contains
		assert.property(actual, property, [message]);
		assert.deepProperty(actual, property, [message]);    // property supports dot.notation[idx]
		assert.propertyVal(actual, property, value, [message]);
		assert.sameMembers(actual, expected, [message]);     // arrays ignore order of values
		assert.includeMembers(actual, expected, [message]);  // array subset is included
		// exceptions
		// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
		assert.throw/throws/Throw(fn, [constructor/string/regexp], [string/regexp], [message]);
		assert.doesNotThrow(fn, [constructor/regexp], [message]);
		// objects/types
		assert.typeOf(actual, type, [message]);
		assert.instanceOf(actual, constructor, [message]);
		assert.isTrue(actual, [message]);  // actual true

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

var isNode = typeof process === 'object' && process + '' === '[object process]',
	dump = function (n, o) { console.log(n, isNode ? require('util').inspect(o) : o); },
	chai = chai || require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should(), // note function call here
	Classes = !isNode ? window.Classes : {
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

	dump('instance of ' + base, inst);
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

testBase('augment', 'Classes.Augment', Classes.Augment);
testBase('klass',   'Classes.Klass',   Classes.Klass, 'function');

//testBaseInstance('augment', 'Classes.Augment', Classes.Augment);
testBaseInstance('klass',   'Classes.Klass',   Classes.Klass);


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
