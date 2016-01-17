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
var Documents = require('./document.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of things
exports.index = function(req, res) {
  Documents.find(function (err, documents) {
    if(err) {  return handleError(res, err); }
    return res.json(200, documents);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Documents.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(document);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Documents.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {

  var id = new ObjectId(req.params.id);

  if(req.body._id) { delete req.body._id; }
  Documents.findById(id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.extend(thing, req.body);
    updated.markModified('records');
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {

  Documents.findById(req.params.id, function (err, document) {
    if(err) { return handleError(res, err); }
    if(!document) { return res.send(404); }
    document.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


function handleError(res, err) {
  return res.send(500, err);
}
