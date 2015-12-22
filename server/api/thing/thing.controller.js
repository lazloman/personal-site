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
var Documents = require('./thing.model');

// Get list of things
exports.index = function(req, res) {
  Documents.find(function (err, things) {
    if(err) {  return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Documents.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
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
  if(req.body._id) { delete req.body._id; }
  Documents.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    var updated = _.merge(thing, req.body);
    updated.markModified('records');
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Documents.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.writeFile = function(req, res) {

  var part = req.files.filefield;

  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    content_type:part.mimetype
  });


  writeStream.on('close', function() {
    return res.status(200).send({
      message: 'Success'
    });
  });

  writeStream.write(part.data);

  writeStream.end();
};

exports.readFile = function(req, res) {

  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {

    if(files.length===0){
      return res.status(400).send({
        message: 'File not found'
      });
    }

    res.writeHead(200, {'Content-Type': files[0].contentType});

    var readstream = gfs.createReadStream({
      filename: files[0].filename
    });

    readstream.on('data', function(data) {
      res.write(data);
    });

    readstream.on('end', function() {
      res.end();
    });

    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });
  });

};
function handleError(res, err) {
  return res.send(500, err);
}
