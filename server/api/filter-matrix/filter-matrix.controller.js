/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var FilterMatrix = require('./filter-matrix.model');

exports.index = function(req, res) {
  FilterMatrix.find().sort({name: 1}).exec(function (err, filterMatrices) {
    if(err) { return handleError(res, err); }
    return res.json(200, filterMatrices);
  });
};

exports.create = function(req, res) {
  FilterMatrix.create(req.body, function(err, filterMatrix) {
    if(err) { return handleError(res, err); }
    return res.json(201, filterMatrix);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  FilterMatrix.findById(req.params.id, function (err, filterMatrix) {
    if (err) { return handleError(res, err); }
    if(!filterMatrix) { return res.send(404); }
	  filterMatrix.name = req.body.name;
	  if (!filterMatrix.readonly) {
		  filterMatrix.data = req.body.data;
	  }
    filterMatrix.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, filterMatrix);
    });
  });
};

exports.destroy = function(req, res) {
  FilterMatrix.findById(req.params.id, function (err, filterMatrix) {
    if(err) { return handleError(res, err); }
    if(!filterMatrix) { return res.send(404); }
	  if(filterMatrix.readonly) { return res.send(400, 'Can\'t delete readonly matrix.'); }
    filterMatrix.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}