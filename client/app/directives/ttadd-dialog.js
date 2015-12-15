'use strict';

angular.module('thethurmansApp')
  .directive('addGroupButton', function(prompt, MongoService, NewGroupService) {

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
          }).then(function (title) {
            if (title) {
              var newGroup = NewGroupService.NewGroup(title);
              MongoService.http.post(newGroup).$promise.then(function(data){
                    $scope.documents.push(data);
              });
            }
          });
        };
      }
    };
  });
