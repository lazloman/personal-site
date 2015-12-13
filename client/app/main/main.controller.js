'use strict';

angular.module('thethurmansApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.Documents = [];

    $http.get('/api/things').success(function(documents) {
      $scope.Documents = documents;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
