/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var matrixParser = require('../../utils/matrix-parser');
var FilterMatrix = require('./filter-matrix.model');

// Get list of things
exports.index = function(req, res) {
  FilterMatrix.find().sort({name: 1}).exec(function (err, filterMatrices) {
    if(err) { return handleError(res, err); }
    return res.json(200, filterMatrices);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  if (_.isString(req.body.data)) {
    req.body.data = matrixParser(req.body.data, '\n', ' ')
  }
  FilterMatrix.create(req.body, function(err, filterMatrix) {
    if(err) { return handleError(res, err); }
    return res.json(201, filterMatrix);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FilterMatrix.findById(req.params.id, function (err, filterMatrix) {
    if (err) { return handleError(res, err); }
    if(!filterMatrix) { return res.send(404); }
    _.extend(filterMatrix, req.body);
    filterMatrix.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, filterMatrix);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  FilterMatrix.findById(req.params.id, function (err, filterMatrix) {
    if(err) { return handleError(res, err); }
    if(!filterMatrix) { return res.send(404); }
    filterMatrix.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}