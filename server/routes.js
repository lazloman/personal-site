/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/file', require('./api/file'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  var file  = require('./api/file/file.controller');

  app.route('/api/:id')
    .get(file.read);

  app.route('/uploads')
    .post(file.create);

  // All other routes should redirect to the index.htm
  //
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

};
