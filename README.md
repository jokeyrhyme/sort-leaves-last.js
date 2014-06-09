# sort-leaves-last.js

Sort an Array of related Objects so that parents always precede their
children

```javascript
/**
 * @param {Object[]} nodes an array of objects that need to be sorted
 * @param {Function} TreeAdapter constructor used to map relations
 * @returns {Object[]}
 */
return function sortLeavesLast(nodes, TreeAdapter)
```

The nodes may have 0..n children. For my use case, nodes may also have
0..n parents. However, for all nodes, there must be no intersection
between the sets of parents and children (no grand-father paradox!).

The Array of nodes may includes nodes from multiple distinct graphs.

