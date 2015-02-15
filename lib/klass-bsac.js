/*!
	* klass: a classical JS OOP façade
	* https://github.com/ded/klass
	* License MIT (c) Dustin Diaz 2014
	*/
/* jshint strict: false */
/* globals define */
/* jshint -W032 */ // unnecessary semicolon
; /* jshint +W032 */
(function (name, context, definition) {
	if (typeof define === 'function') {
		define(definition);
	}
	else if (typeof module !== 'undefined') {
		module.exports = definition();
	}
	else {
		context[name] = definition();
	}
})('klass', this, function () {
	var context = this
		, f = 'function'
		, fnTest = /xyz/.test(function () {var xyz; void xyz;}) ? /\bsupr\b/ : /.*/
		, proto = 'prototype';

	void context;

	function klass(o) {
		return extend.call(isFn(o) ? o : function () {}, o, 1);
	}

	function isFn(o) {
		return typeof o === f;
	}

	function wrap(k, fn, supr) {
		return function () {
			var tmp = this.supr;
			this.supr = supr[proto][k];
			var undef = {}.fabricatedUndefined;
			var ret = undef;
			try {
				ret = fn.apply(this, arguments);
			} finally {
				this.supr = tmp;
			}
			return ret;
		};
	}

	function process(what, o, supr) {
		for (var k in o) {
			if (o.hasOwnProperty(k)) {
				what[k] = isFn(o[k])
					&& isFn(supr[proto][k])
					&& fnTest.test(o[k])
					? wrap(k, o[k], supr) : o[k];
			}
		}
	}

	function extend(o, fromSub) {
		// must redefine NoOp each time so it doesn't inherit
		// from previous arbitrary classes
		function NoOp() {}
		NoOp[proto] = this[proto];
		var supr = this
			, prototype = new NoOp()
			, isFunction = isFn(o)
			, _constructor = isFunction ? o : this
			, _methods = isFunction ? {} : o;
		function fn() {
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
			else {
				var op = fromSub || isFunction && supr.apply(this, arguments);
				void op;
				_constructor.apply(this, arguments);
			}
		}

		fn.methods = function (o) {
			process(prototype, o, supr);
			fn[proto] = prototype;
			return this;
		};

		fn.methods.call(fn, _methods).prototype.constructor = fn;

		/* jshint -W059 */ // avoid arguments.callee as performance suffers
		fn.extend = arguments.callee;
		/* jshint +W059 */ // avoid arguments.callee as performance suffers

		fn[proto].implement = fn.statics = function (o, optFn) {
			o = typeof o === 'string' ? (function () {
				var obj = {};
				obj[o] = optFn;
				return obj;
			}()) : o;
			process(this, o, supr);
			return this;
		};

		return fn;
	}

	return klass;
});
