'use strict';

var _ = require('lodash'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    matrixParser = require('../../utils/matrix-parser');

var mToNmFactor = Math.pow(10, 9);
function calculateMinMax(topoMatrix) {
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  _.each(topoMatrix, function(row) {
    _.each(row, function(cell) {
      min = cell < min ? cell : min;
      max = cell > max ? cell : max;
    })
  });
  return {
    min: min,
    max: max
  };
}

var TopoMatrixSchema = new Schema({
  name: String,
  data: {
    type: mongoose.Schema.Types.Mixed,
    set: function(value) {
      if (_.isString(value)) {
        value = matrixParser(value, '\n', '\t');
      }
      value = _.map(value, function(row) {
        return _.map(row, function(cell) {
          return cell * mToNmFactor;
        })
      });
      return _.extend({value: value}, calculateMinMax(value));
    }
  },
  from: Number,
  to: Number,
  distance: Number
});

TopoMatrixSchema.pre('save', function (next) {
  this.from = this.from || this.data.min;
  this.to = this.to || this.data.max;
  next();
});

module.exports = mongoose.model('TopoMatrix', TopoMatrixSchema);