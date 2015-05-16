'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopoMatrixSchema = new Schema({
  name: String,
  data: Array
});

module.exports = mongoose.model('TopoMatrix', TopoMatrixSchema);