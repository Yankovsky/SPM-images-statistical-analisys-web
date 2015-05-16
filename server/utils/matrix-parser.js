'use strict';

var _ = require('lodash');

module.exports = function(matrixAsString, rowDelimiter, columnDelimiter) {
	return _.map(matrixAsString.toString().split(rowDelimiter), function(row) {
		return _.map(row.split(columnDelimiter), function(cell) {
			return +cell;
		});
	})
};