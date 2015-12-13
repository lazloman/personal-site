'use strict';

angular.module('thethurmansApp')
  .directive('ttaccordion', function() {

    return {
      scope: {
        records: '='
      },
      restrict: 'E',
      templateUrl: 'app/directives/ttaccordion.html'
    };
  });

