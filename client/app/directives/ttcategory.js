'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function(MongoService, Upload, $modal, $timeout, GridFSService) {

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
            templateUrl: '/api/files',
            scope: $scope
          });
        };

        $scope.ok = function(){

          MongoService.http.delete({'id': $scope.record._id}).$promise.then(function () {

            var index = $scope.allRecords.indexOf($scope.record);
            $scope.allRecords.splice(index, 1);
          });
        };

        $scope.cancel = function () {

          $scope.modalInstance.dismiss('cancel');
        };

        $scope.$watch('droppedFiles', function(files){

          if(typeof files !== 'undefined' && files[0].size > 0) {

            //$scope.record.records.push({'name': files[0].name, 'id': 'sddsfdsfsdf'});
            //MongoService.http.update({'id': $scope.record._id, 'records': $scope.record.records});

            $scope.uploadFile(files[0]);

          }
        });

        $scope.uploadFile = function(file){

          var uploadFile = {
            'title': file.name,
            'data': file
          };

          Upload.upload({
            url: './uploads/',
            data: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.log = 'progress: ' + progressPercentage + '% ' +
              evt.config.data.title + '\n' + $scope.log;
          }).success(function (data, status, headers, config) {
            $timeout(function(evt) {
              $scope.log = 'file: ' + evt.config.data.title + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            });
          }).error(function(err){
            console.log(err);
          });
        };
      }
    };
  });

