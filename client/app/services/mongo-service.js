'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          newGroup: '@newGroup',
          records: '@records',
          id: '@id'
        }, {
        update: {
          method: 'PUT',
          url: '/api/things/:id'
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
          url: '/api/things/:id'
        },
        addDocument: {
          params: {
            document: '@document'
          },
          method: 'POST'
        },
        createFile:{
          params: {
            id: '@id'
          }
        }
      })
    };
  });

