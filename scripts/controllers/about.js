'use strict';

/**
 * @ngdoc function
 * @name zennetApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the zennetApp
 */
angular.module('zennetApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
