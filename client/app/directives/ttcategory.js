'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function(MongoService, Upload, $modal) {

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
        };

        $scope.cancel = function () {

          $scope.modalInstance.dismiss('cancel');
        };

        $scope.$watch('droppedFiles', function(files){

          if(typeof files !== 'undefined' && files[0].size > 0) {

            $scope.uploadFile(files[0]);

          }
        });

        $scope.removeFile = function(index){

          $scope.index = index;

          $scope.modalInstance = $modal.open({
            templateUrl: 'app/directives/confirm-file-removal.html',
            scope: $scope,
            resolve:{
              index: function () {
                return $scope.index;
              }
            }
          });
        };

        $scope.deleteFile = function(){

          MongoService.http.delete({'name': $scope.record.records[$scope.index].name}).$promise.then(function (data){

            $scope.modalInstance.dismiss('cancel');
          });
        },

        $scope.uploadFile = function(file){

          var uploadFile = {
            'data': file
          };

          Upload.upload({
            url: './uploads',
            data: uploadFile
          }).progress(function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //$scope.log = 'progress: ' + progressPercentage + '% ' +
            //  evt.config.data.title + '\n' + $scope.log;

          }).success(function (data, status, headers, config) {

            $scope.record.records.push({'name': file.name, 'id': data.file._id});
            MongoService.http.update({'id': $scope.record._id, 'records': $scope.record.records});

          }).error(function(err){
            console.log(err);
          });
        };
      }
    };
  });

