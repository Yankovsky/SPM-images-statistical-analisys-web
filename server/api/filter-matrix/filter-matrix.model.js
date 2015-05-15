'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FilterMatrixSchema = new Schema({
  name: String,
  data: Array
});

module.exports = mongoose.model('FilterMatrix', FilterMatrixSchema);