'use strict';

var express = require('express');
var filterMatrixController = require('./filter-matrix.controller');

var router = express.Router();

router.get('/', filterMatrixController.index);
router.get('/:id', filterMatrixController.show);
router.post('/', filterMatrixController.create);
router.put('/:id', filterMatrixController.update);
router.patch('/:id', filterMatrixController.update);
router.delete('/:id', filterMatrixController.destroy);

module.exports = router;