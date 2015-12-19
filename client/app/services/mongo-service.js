'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          newGroup: '@newGroup',
          document: '@document',
          id: '@id'
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
        },
        delete:{
          method: 'DELETE',
          url: '/api/things/:id',
          isArray: true
        },
        addDocument: {
          params: {
            document: '@document'
          },
          method: 'POST'
        }
      })
    };
  });

