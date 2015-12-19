'use strict';

angular.module('thethurmansApp')
  .controller('MainCtrl', function ($scope, $http, MongoService) {

    $scope.droppedFiles = 'sasdsa';

    $scope.Documents = MongoService.http.get();

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$watch('droppedFiles', function(){

      console.log('Got files');
    });
  });
