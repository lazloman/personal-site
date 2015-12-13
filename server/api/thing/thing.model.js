'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DocumentsSchema = new Schema({
  title: String,
  records: Schema.Types.Mixed
});

module.exports = mongoose.model('Documents', DocumentsSchema);
