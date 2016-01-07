'use strict';

angular.module('thethurmansApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/things')
      .success(function(data) {
        $scope.Documents = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  });
