'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function() {

    return {
      scope: {
        record: '=',
        droppedFiles: '=',
      },
      restrict: 'E',
      templateUrl: 'app/directives/ttcategory.html',
      controller: function($scope){

        $scope.isCollapsed = true;
        $scope.$watch('droppedFiles', function(){

          console.log('Got files');
        });
      }
    };
  });

