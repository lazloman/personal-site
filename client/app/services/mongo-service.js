'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          newGroup: '@newGroup',
          records: '@records',
          id: '@id',
          file: '@file'
        }, {
        update: {
          method: 'PUT',
          url: '/api/things/:id'
        },
        get: {
          isArray: true,
          method: 'GET'
        },
        writefile:{
          params:{
            id:'@id',
            file: '@file'
          },
          method: 'PUT'
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
        }
      })
    };
  });

