'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function(MongoService, $modal) {

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

        $scope.removeCategory = function(){

          $scope.modalInstance = $modal.open({
            templateUrl: 'app/directives/confirm-category-removal.html',
            scope: $scope
          });
        };

        $scope.ok = function(){

          MongoService.http.delete({'id': $scope.record._id}).$promise.then(function () {

            var index = $scope.allRecords.indexOf($scope.record);
            $scope.allRecords.splice(index, 1);
          });
        }

        $scope.cancel = function () {

          $scope.modalInstance.dismiss('cancel');
        };
        $scope.$watch('droppedFiles', function(files){

          if(typeof files !== 'undefined') {
            console.log(files[0].name);
          }
        });
      }
    };
  });

