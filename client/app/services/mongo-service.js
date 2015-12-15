'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          newGroup: '@newGroup'
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
            name: '@newGroup'
          },
          method: 'POST'
        }
      })

    };
  });

