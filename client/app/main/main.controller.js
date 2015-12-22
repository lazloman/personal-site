'use strict';

angular.module('thethurmansApp')
  .controller('MainCtrl', function ($scope, $http, MongoService) {

    $scope.Documents = MongoService.http.get();
  });
