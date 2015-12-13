'use strict';

angular.module('thethurmansApp')
  .controller('MainCtrl', function ($scope, $http, MongoService) {
    $scope.Documents = [];

    $scope.Documents = MongoService.http.get();

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
