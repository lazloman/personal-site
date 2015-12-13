'use strict';

angular.module('thethurmansApp')
  .directive('addGroupButton', function(prompt, MongoService) {

    return{

      restrict: 'E',
      templateUrl: 'app/directives/ttadd-dialog.html',
      scope: {
        documents: '='
      },
      controller: function($scope){

        $scope.addNewGroup = function(){

          prompt({
            'title': 'Add New Group',
            'input': true,
            'label': 'New Group Title'
          }).then(function (result) {
            if (result) {
              var newGroupTitle = {
                "title" : result,
                "records" : []
              };
              MongoService.http.post(newGroupTitle).$promise.then(function(data){
                    $scope.documents.push(data);
              });
            }
          });
        };
      }
    };
  });
