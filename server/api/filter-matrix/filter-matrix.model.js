'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    matrixParser = require('../../utils/matrix-parser');

var FilterMatrixSchema = new Schema({
  name: String,
  data: {
    type: Array,
    set: function(value) {
      return _.isString(value) ? matrixParser(value, '\n', ' ') : value;
    }
  }
});

module.exports = mongoose.model('FilterMatrix', FilterMatrixSchema);