'use strict';

angular.module('thethurmansApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'ThurmanCtrl'
      });
  });
