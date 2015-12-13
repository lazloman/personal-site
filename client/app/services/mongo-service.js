'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          name: '@name'
        }, {
        update: {
          method: 'PUT'
        },
        get: {
          isArray: true,
          method: 'GET'
        },
        post: {
          params: {
            name: '@name'
          },
          method: 'POST'
        }
      })

    };
  });

