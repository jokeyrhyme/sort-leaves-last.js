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

  // handle nodes with parents that have already been sorted
  function siftRemaining (roots, leaves, working) {
    var remaining, i, item, length, isRelativelySorted;

    isRelativelySorted = function (sortedRelatives) {
      return function (relative) {
        return sortedRelatives.indexOf(relative) !== -1;
      };
    };

    // check for possible roots
    remaining = [];
    length = working.length;
    for (i = 0; i < length; i += 1) {
      item = working[i];
      if (item.parentNodes.every(isRelativelySorted(roots))) {
        roots.push(item);
      } else {
        remaining.push(item);
      }
    }

    // check for possible leaves
    working = remaining;
    remaining = [];
    i = working.length;
    while (i > 0) {
      i -= 1;
      item = working[i];
      if (item.childNodes.every(isRelativelySorted(leaves))) {
        leaves.unshift(item);
      } else {
        remaining.push(item);
      }
    }
    return remaining;
  }


  /**
   * @param {Object[]} items an array of objects that need to be sorted
   * @param {Function} TreeAdapter constructor used to map relations
   * @returns {Object[]}
   */
  return function sortLeavesLast(items, TreeAdapter) {
    var roots, leaves, remaining, i, item, length;

    roots = [];
    leaves = [];
    remaining = [];

    // handle the easy nodes first
    length = items.length;
    for (i = 0; i < length; i += 1) {
      item = items[i];
      if (!item.parentNode && !item.parentNodes.length) {
        roots.push(item);
      } else if (!item.childNodes.length) {
        leaves.push(item);
      } else {
        remaining.push(item);
      }
    }

    remaining = siftRemaining(roots, leaves, remaining);
    while (remaining.length) {
      remaining = siftRemaining(roots, leaves, remaining);
    }

    return roots.concat(remaining, leaves);
  };
}));
