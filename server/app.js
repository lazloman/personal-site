/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var multer  = require('multer');
var bodyParser = require('body-parser');
var upload = multer({ 'dest': './api/uploads/', 'Content-Type': 'undefined'});

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
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

app.post('/uploads', upload.single('droppedFiles'), function(req, res){
  console.log(req.body) // form fields
  console.log(req.file) // form files
  res.status(204).end()
});

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true }));

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
