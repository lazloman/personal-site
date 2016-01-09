'use strict';

angular.module('thethurmansApp')
  .factory('MongoService', function ($resource) {

    return {

      http: $resource('/api/things', {
          newGroup: '@newGroup',
          records: '@records',
          id: '@id',
          file: '@file',
          path: '@path'
        }, {
        update: {
          method: 'PUT',
          url: '/api/things/:id'
        },
        get: {
          isArray: true,
          method: 'GET'
        },
        getDocument:{
          isArray: true,
          id: '@id',
          url: '/api/things/:id',
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
        },
        removeFile:{
          method: 'DELETE',
          url: '/api/things/:id/:path/:fileId'
        }
      })
    };
  });

