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
var File = require('./file.model');
var mongoose = require('mongoose');

var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

// Get list of things
exports.read = function(req, res) {
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


// Creates a new file in the DB.
exports.create = function(req, res) {

  var part = req.files.filefield;
  var fileId = Date.now();

  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    metadata: {fileId: fileId},
    content_type:part.mimetype
  });


  writeStream.on('close', function() {

    return res.status(200).send({
      fileId: fileId,
      message: 'WooHoo'
    });
  });

  //writeStream.on('begin', function (fileInfo, req, res) {
  //
  //});

  writeStream.on('end', function (fileInfo, req, res) {
    console.log(fileInfo);
  });

  writeStream.write(part.data);
  writeStream.end();
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  File.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
