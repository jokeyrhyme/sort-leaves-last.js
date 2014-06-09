// https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.sortLeavesLast = factory();
  }
}(this, function () {
  'use strict';
  /**
   * @param {Object[]} items an array of objects that need to be sorted
   * @param {Function} TreeAdapter constructor used to map relations
   * @returns {Object[]}
   */
  return function sortLeavesLast(items, TreeAdapter) {
  };
}));
