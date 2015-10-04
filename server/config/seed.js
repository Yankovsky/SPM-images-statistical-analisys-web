/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs');
var FilterMatrix = require('../api/filter-matrix/filter-matrix.model');
var TopoMatrix = require('../api/topo-matrix/topo-matrix.model');

FilterMatrix.find({}).remove(function() {
  FilterMatrix.create({
    name : 'Стандартная матрица фильтра',
    data : [
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0],
      [0, 0, 2, 2, 3, 3, 4, 3, 3, 2, 2, 0, 0],
      [0, 1, 2, 3, 3, 3, 2, 3, 3, 3, 2, 1, 0],
      [0, 1, 3, 3, 1, -4, -6, -4, 1, 3, 3, 1, 0],
      [1, 2, 3, 3, -4, -14, -19, -14, -4, 3, 3, 2, 1],
      [1, 2, 4, 2, -6, -19, -24, -19, -6, 2, 4, 2, 1],
      [1, 2, 3, 3, -4, -14, -19, -14, -4, 3, 3, 2, 1],
      [0, 1, 3, 3, 1, -4, -6, -4, 1, 3, 3, 1, 0],
      [0, 1, 2, 3, 3, 3, 2, 3, 3, 3, 2, 1, 0],
      [0, 0, 2, 2, 3, 3, 4, 3, 3, 2, 2, 0, 0],
      [0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
    ]
  }, {
    name : 'Неизменяемая матрица',
    data : [
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5]
    ],
    readonly: true
  }, {
    name: 'from file',
    data: fs.readFileSync('./data/filter-matrix').toString()
  });
});

TopoMatrix.find({}).remove(function() {
  TopoMatrix.create({
    name: 'topo-matrix',
    distance: 5,
    data: fs.readFileSync('./data/topo-matrix').toString()
  }, {
    name: 'topo-matrix2',
    distance: 10,
    data: fs.readFileSync('./data/topo-matrix2').toString()
  });
});