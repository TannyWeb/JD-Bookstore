// This function has a set timeout and waits to check if the element on the page is present
// Real handy when working with dynamic data not curently on the page

export default function waitFor(assertion, callback, interval, maxAttempts) {
	var INT = interval || 100;
	var LIMIT = maxAttempts || 1000;
	var test, timer;
	if (typeof assertion === 'function') {
		test = assertion;
	} else if (typeof assertion === 'string') {
		test = function() {
			return document.querySelectorAll(assertion).length > 0;
		};
	} else if (Array.isArray(assertion)) {
		test = function() {
			return (
				assertion
					.reduce(function(o, n) {
						if (typeof n !== 'function' && typeof n !== 'string') {
							window.clearInterval(timer);
							throw new Error('assertion is not a string or function');
						}
						o.push(typeof n === 'function' ? n() : document.querySelectorAll(n).length > 0);
						return o;
					}, [])
					.indexOf(false) === -1
			);
		};
	} else {
		throw new Error('assertion must be a Function, String, or Array');
	}

	function loop() {
		if (--LIMIT === 0) {
			window.clearInterval(timer);
			return;
		}
		if (test() === true) {
			window.clearInterval(timer);
			callback();
		}
	}
	if (typeof test === 'function') {
		timer = window.setInterval(loop, INT);
		loop();
	}
}
