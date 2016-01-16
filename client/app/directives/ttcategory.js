'use strict';

angular.module('thethurmansApp')
  .directive('ttcategory', function(MongoService, Upload, $modal, $http) {

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

          $scope.modalInstance.dismiss();
        };

        $scope.$watch('droppedFiles', function(files){

          if(typeof files !== 'undefined' && files[0].size > 0) {

            $scope.uploadFile(files[0]);

          }
        });

        $scope.removeFile = function(index){

          $scope.index = index;
          $scope.document = $scope.record.records[$scope.index];

          $scope.modalInstance = $modal.open({
            templateUrl: 'app/directives/confirm-file-removal.html',
            scope: $scope,
            resolve:{
              index: function () {
                return $scope.index;
              },
              document: function(){
                return $scope.document;
              }
            }
          });
        };

        $scope.deleteFile = function(){

          var targetId = $scope.record.records[$scope.index].id;
          $scope.record.records.splice($scope.index, 1);

          $http.delete('/api/file/delete/' + targetId)
            .success(function(){

              $http.put('/api/document/' + $scope.record._id, $scope.record)
                .success(function(data) {
                    $scope.record = data;
                })
                .error(function(err) {
                  console.dir(err);
                });
            })
            .error(function(err){
              console.log('Error ' + err);
            })
            .finally(function(){
              $scope.modalInstance.dismiss();
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

          }).success(function (data) {

            $scope.record.records.push({'name': file.name, 'id': data.file._id});

            $http.put('/api/document/' + $scope.record._id, $scope.record)
              .success(function(data) {
                $scope.record = data;
              })
              .error(function(err) {
                console.dir(err);
              });

          }).error(function(err){
            console.log(err);
          });
        };
      }
    };
  });

