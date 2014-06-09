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
  var assert, fixtures, sortLeavesLast, runs, chance, toString;
  assert = global.chai.assert;
  chance = global.chance;

  fixtures = global.fixtures;
  sortLeavesLast = global.sortLeavesLast;

  runs = 0;

  toString = function toString(nodes) {
    var strings;
    strings = nodes.map(function (node) {
      return node.toString();
    });
    return '"' + strings.join('", "') + '"';
  };

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

          test(toString(array), function () {}); // just for reporting

          test(toString(result), function () {}); // just for reporting

          test('sorted array has the same length as input', function () {
            assert.lengthOf(array, result.length);
          });

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

          test('parentless nodes were stable-sorted', function () {
            var input, output, i;
            input = array.filter(function (node) {
              return !node.parentNodes.length;
            });
            output = result.filter(function (node) {
              return !node.parentNodes.length;
            });
            assert.lengthOf(input, output.length);
            i = input.length;
            while (i > 0) {
              i -= 1;
              assert.equal(input[i].name, output[i].name);
            }
          });

          test('childless (child) nodes were stable-sorted', function () {
            var input, output, i;
            input = array.filter(function (node) {
              return node.parentNodes.length && !node.childNodes.length;
            });
            output = result.filter(function (node) {
              return node.parentNodes.length && !node.childNodes.length;
            });
            assert.lengthOf(input, output.length);
            i = input.length;
            while (i > 0) {
              i -= 1;
              assert.equal(input[i].name, output[i].name);
            }
          });

        });

      }(runs, array, result));

      runs += 1;
    }
  });
}(this));
