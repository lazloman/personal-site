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

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);
var ObjectId = require('mongoose').Types.ObjectId;

function handleError(res, err) {
  return res.send(err);
}

function callback(res, err){

}

// Get list of things
exports.read = function(req, res) {

  var id = new ObjectId(req.params.id);
  var collection = gfs.collection('fs');

  collection.findOne({_id: id}, function (err, obj) {

    if(!obj){
      return res.status(400).send({
        message: 'File not found'
      });
    }

    res.writeHead(200, {'Content-Type': obj.contentType});

    var readstream = gfs.createReadStream({
      _id: obj._id
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


  writeStream.on('end', function (fileInfo, req, res) {
    console.log(fileInfo);
  });

  writeStream.write(part.data);
  writeStream.end();
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {

  var collection = gfs.collection('fs');
  var id = new ObjectId(req.params.id);

  collection.findOne({_id : id}, function (err, obj) {

    if (err) return handleError(res, err); // don't forget to handle error/
    gfs.remove(obj, function(err){
      if (err) res.send(500);
       return res.json(200);
    })
  });
};

exports.destroyAll = function(req, res) {

  var id = new ObjectId(req.params.ids);
  var collection = gfs.collection('fs');

  collection.findOne({_id: id}, function (err, obj) {

    if (err) return handleError(res, err); // don't forget to handle error/
    gfs.remove(obj, function (err) {
      if (err) res.send(500);
      return res.json(200);
    })
  });
};
