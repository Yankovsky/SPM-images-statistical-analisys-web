/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var matrixParser = require('../../utils/matrix-parser');
var TopoMatrix = require('./topo-matrix.model');

// Get list of things
exports.index = function(req, res) {
  TopoMatrix.find(function (err, topoMatrices) {
    if(err) { return handleError(res, err); }
    return res.json(200, topoMatrices);
  });
};

// Get a single thing
exports.show = function(req, res) {
  TopoMatrix.findById(req.params.id, function (err, topoMatrix) {
    if(err) { return handleError(res, err); }
    if(!topoMatrix) { return res.send(404); }
    return res.json(topoMatrix);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  if (_.isString(req.body.data)) {
    req.body.data = matrixParser(req.body.data, '\n', '\t')
  }
  TopoMatrix.create(req.body, function(err, topoMatrix) {
    if(err) { return handleError(res, err); }
    return res.json(201, topoMatrix);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TopoMatrix.findById(req.params.id, function (err, topoMatrix) {
    if (err) { return handleError(res, err); }
    if(!topoMatrix) { return res.send(404); }
    _.extend(topoMatrix, req.body);
    topoMatrix.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, topoMatrix);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  TopoMatrix.findById(req.params.id, function (err, topoMatrix) {
    if(err) { return handleError(res, err); }
    if(!topoMatrix) { return res.send(404); }
    topoMatrix.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}