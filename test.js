'use strict';
var assert = require('assert');
var rocambole = require('rocambole');
var stripNgLog = require('./');

function strip(str) {
	return rocambole.moonwalk(str, function (node) {
			stripNgLog(node);
	}).toString();
}

it('should strip $log statement', function () {
	assert.equal(strip('function test(){$log.debug("foo");}'), 'function test(){void 0;}');
	assert.equal(strip('"use strict";$log.debug("foo");foo()'), '"use strict";void 0;foo()');
	assert.equal(strip('if($log){$log.debug("foo", "bar");}'), 'if($log){void 0;}');
	assert.equal(strip('foo && $log.debug("foo");'), 'foo && void 0;');
	assert.equal(strip('if (foo) $log.debug("foo")\nnextLine();'), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(strip(t), t);
});
