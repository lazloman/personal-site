'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
      }, {
        update: {
          method: 'PUT'
        },
        get: {
          isArray: true,
          method: 'GET'
        },
        post: {
          method: 'POST'
        }
      })

    };
  });

