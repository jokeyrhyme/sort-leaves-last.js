(function (global) {
  'use strict';
  if (typeof require === 'function') {
    global.chai = global.chai || require('assertive-chai');

    global.sortLeavesLast = global.sortLeavesLast || require('../poll-until');
  }
}(this));

(function (global) {
  'use strict';
  var assert, pollUntil;
  assert = global.chai.assert;

  pollUntil = global.sortLeavesLast;

  suite('sortLeavesLast', function () {

    test('global function', function () {
      assert.isFunction(sortLeavesLast);
    });

  });
}(this));
