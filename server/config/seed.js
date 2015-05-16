/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs');
var matrixParser = require('../utils/matrix-parser');
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
    name : 'Какая-то другая',
    data : [
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5],
      [1,2,3,4,5]
    ]
  }, {
    name: 'from file',
    data: matrixParser(fs.readFileSync('./data/filter-matrix').toString(), '\n', ' ')
  });
});

TopoMatrix.find({}).remove(function() {
  TopoMatrix.create({
    name: 'topo-matrix',
    data: matrixParser(fs.readFileSync('./data/topo-matrix').toString(), '\n', '\t')
  });
});