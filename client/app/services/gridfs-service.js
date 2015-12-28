'use strict';

angular.module('thethurmansApp')
  .factory('GridFSService', function ($resource) {

    return {

      http: $resource('/api/file', {
        name: '@name',
        file: '@file',
        id: '@id'
      }, {
        get: {
          method: 'GET',
          url: '/api/file/:id'
        },
        post: {
          method: 'POST',
          url: '/api/file/:name',
          params: {
            name: '@name'
          }
        },
        delete:{
          url: '/api/file/:id',
          method: 'DELETE'
        }
      })
    };
  });

