(function (global) {
  'use strict';
  if (typeof require === 'function') {
    global.chai = global.chai || require('assertive-chai');
    global.chance = global.chance || require('chance');

    global.fixtures = global.fixtures || require('./fixtures');
    global.sortLeavesLast = global.sortLeavesLast || require('../sort-leaves-last');
  }
}(this));

(function (global) {
  'use strict';
  var assert, fixtures, sortLeavesLast, runs, chance;
  assert = global.chai.assert;
  chance = global.chance;

  fixtures = global.fixtures;
  sortLeavesLast = global.sortLeavesLast;

  runs = 0;

  suite('sortLeavesLast', function () {
    var array, result;

    test('global function', function () {
      assert.isFunction(sortLeavesLast);
    });

    while (runs < 50) {

      array = fixtures();
      result = sortLeavesLast(array);

      (function (runs, array, result) {

        suite('run #' + runs, function () {

          test(JSON.stringify(array.map(function (i) { return i.name; })),
              function () {}); // just for reporting

          test(JSON.stringify(result.map(function (i) { return i.name; })),
              function () {}); // just for reporting

          test('first node has no parents', function () {
            var first;
            first = result[0];
            assert.lengthOf(first.parentNodes, 0);
          });

          test('last node has no children', function () {
            var last;
            last = result[result.length - 1];
            assert.lengthOf(last.childNodes, 0);
          });

        });

      }(runs, array, result));

      runs += 1;
    }
  });
}(this));
