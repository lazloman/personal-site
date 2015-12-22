'use strict';

angular.module('thethurmansApp')
  .filter('removeFileExtension', function () {
    return function (item, name) {

      var rawFileName = item;
      var index = rawFileName.indexOf('.');

        if(index !==  -1){
          rawFileName = rawFileName.slice(0, index);
        }
      return rawFileName;
    };
  });
