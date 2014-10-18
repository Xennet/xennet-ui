'use strict';

/**
 * @ngdoc overview
 * @name zennetApp
 * @description
 * # zennetApp
 *
 * Main module of the application.
 */
angular
  .module('zennetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'rzModule',
    'highcharts-ng',
    'timer',
    'perfect_scrollbar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/advanced', {
          templateUrl: 'views/worker.html',
          controller: 'WorkerCtrl'
        })
        .when("/dashboard",{
            templateUrl:'views/dashboard.html',
            controller:'DashboardCtrl'
        })

        .otherwise({
          redirectTo: '/'
        });
  });
