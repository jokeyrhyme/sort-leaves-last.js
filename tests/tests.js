(function (global) {
  'use strict';
  if (typeof require === 'function') {
    global.chai = global.chai || require('assertive-chai');
    global.chance = global.chance || require('chance');

    global.sortLeavesLast = global.sortLeavesLast || require('../sort-leaves-last');
  }
}(this));

(function (global) {
  'use strict';
  var assert, sortLeavesLast;
  assert = global.chai.assert;

  sortLeavesLast = global.sortLeavesLast;

  suite('sortLeavesLast', function () {

    test('global function', function () {
      assert.isFunction(sortLeavesLast);
    });

  });
}(this));
