'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DocumentsSchema = new Schema({
  title: String,
  docType: String,
  records: Array
});

module.exports = mongoose.model('Documents', DocumentsSchema);
