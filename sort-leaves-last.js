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
    var roots, leaves, middles, i, item, length;

    roots = [];
    leaves = [];
    middles = [];

    length = items.length;
    for (i = 0; i < length; i += 1) {
      item = items[i];
      if (!item.parentNode && !item.parentNodes.length) {
        roots.push(item);
      } else if (!item.childNodes.length) {
        leaves.push(item);
      } else {
        middles.push(item);
      }
    }
    return roots.concat(middles, leaves);
  };
}));
