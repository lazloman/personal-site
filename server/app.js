/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var multer  = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ 'dest': './uploads/', 'Content-Type': 'application/json'});

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var Documents = require('./api/things/thing.model');

//var bodyParser = require('body-parser');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

app.use(bodyParser.json());

//app.post('/uploads', upload.single('droppedFiles'), function (req, res, next) {
//  console.log('Here');
//});

app.post('/uploads', upload.single('data'), function(req, res){

  var part = req.file.fieldname;
  var fileId = Date.now();

  var writeStream = gfs.createWriteStream({
    filename: req.file.originalname,
    mode: 'w',
    content_type:part.mimetype,
    metadata: {fileId: fileId},
  });

  writeStream.on('close', function(fileinfo) {

    return res.status(200).send({
      message: 'Success',
      file: fileinfo
    });
  });

  writeStream.write(req.file.path);

  writeStream.end();
});

app.get('/api/things/:id', function(req, res) {
  db.collection('documents', function(error, collection) {
    collection.findOne({ _id : collection.db.bson_serializer.ObjectID.createFromHexString(req.params.id) },
      function(error, document) {
        if (error || !document) {
          res.render('error', {});
        } else {
          res.render('document', { document : document });
        }
      });
  });
});

app.get('/api/documents', function(req, res) {

        // use mongoose to get all documents in the database
        Documents.find(function(err, documents) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(documents); // return all documents in JSON format
        });
    });
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
