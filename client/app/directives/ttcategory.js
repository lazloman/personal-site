'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function(MongoService) {

    return {
      scope: {
        record: '=',
        droppedFiles: '=',
        allRecords: '='
      },
      restrict: 'E',
      templateUrl: 'app/directives/ttcategory.html',
      controller: function($scope){

        $scope.isCollapsed = true;

        $scope.removeCategory = function(record){

          MongoService.http.delete({'id': record._id}).$promise.then(function () {

            var index = $scope.allRecords.indexOf(record);
              $scope.allRecords.splice(index, 1);
            });
        };

        $scope.$watch('droppedFiles', function(files){

          if(typeof files !== 'undefined') {
            console.log(files[0].name);
          }
        });
      }
    };
  });

