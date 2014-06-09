// https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['chance'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('chance'));
  } else {
    root.fixtures = factory(root.Chance);
  }
}(this, function (Chance) {
  'use strict';

  var chance;

  chance = new Chance();

  function Node(name) {
    this.name = name; // only used for testing
    this.parentNodes = [];
    this.childNodes = [];
  }

  /**
   * only used for testing
   */
  Node.prototype.appendChild = function (node) {
    if (this.childNodes.indexOf(node) === -1) {
      this.childNodes.push(node);
    }
    if (node.parentNodes.indexOf(this) === -1) {
      node.parentNodes.push(this);
    }
  };

  /**
   * only used for testing
   */
  Node.prototype.isDescendantOf = function (node) {
    var p, pLength, parent;
    pLength = this.parentNodes.length;
    if (this === node) {
      return true;
    }
    if (!pLength || !node.childNodes.length) {
      return false;
    }
    for (p = 0; p < pLength; p += 1) {
      parent = this.parentNodes[p];
      if (parent === node || parent.isDescendantOf(node)) {
        return true;
      }
    }
    return false;
  };

  /**
   * only used for testing
   */
  Node.prototype.toString = function () {
    return this.parentNodes.length + ':' + this.name + ':' + this.childNodes.length;
  };

  // exports

  return function generate() {
    var max, array, nextName, nextNode;
    array = [];
    max = chance.integer({ min: 5, max: 26 });

    nextName = 'A';
    nextNode = function () {
      var node;
      node = new Node(nextName);
      nextName = String.fromCharCode(nextName.charCodeAt(0) + 1);
      return node;
    };

    while (max > 0) {
      array.push(nextNode());
      max -= 1;
    }
    array.forEach(function (node) {
      var target, times;
      times = chance.integer({ min: 1, max: 2 });
      while (times > 0) {
        target = chance.pick(array);
        if (!target.isDescendantOf(node)) {
          target.appendChild(node);
        }
        times -= 1;
      }
    });
    return chance.shuffle(array);
  };
}));
