'use strict';

angular.module('thethurmansApp')
  .factory('NewGroupService', function () {

    var NewGroupService = {};

    NewGroupService.NewGroup = function (title) {
      this.title = title;
      this.records = [];
      return this;
    };

    return NewGroupService;
  });

