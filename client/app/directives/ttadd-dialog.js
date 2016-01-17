'use strict';

angular.module('thethurmansApp')
  .directive('addGroupButton', function(prompt, $http, NewGroupService) {

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

              $http.post('/api/document/create', newGroup)
                .success(function(data){
                  $scope.documents.push(data);
                })
                .error(function(err){
                  console.log(err);
                })
                .finally(function(){
                  $scope.modalInstance.dismiss();
                });
            }
          });
        };
      }
    };
  });
