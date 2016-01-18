/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/document', require('./api/document'));
  app.use('/api/file', require('./api/file'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  var file  = require('./api/file/file.controller');
  var documents = require('./api/document/document.controller');

  app.route('/api/:id')
    .get(file.read);

  app.route('/api/document/:id').get(documents.update);
  app.route('/api/document/delete/:id').get(documents.destroy);
  app.route('/api/document/delete/:id').delete(documents.destroy);
  app.route('/api/document/create').post(documents.create);
  app.route('/api/document/remove/:id').delete(documents.remove);

  // All other routes should redirect to the index.htm
  //
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
