'use strict';

/**
 * @ngdoc function
 * @name zennetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zennetApp
 */
angular.module('zennetApp')
    .controller('MainCtrl', function ($scope,$rootScope) {
        $rootScope.timerRunning = true;
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.selectComputer = "Personal Computer"
        $scope.radioEnable = true;

        $scope.toggleEnable = function(){
            if($scope.radioEnable == true){
                $scope.radioEnable = false;
            }else{
                $scope.radioEnable = true;
            }
            console.log($scope.radioEnable);
        }
        $scope.toggleStart = function(){
            if($rootScope.started == undefined || $rootScope.started == false){
                $rootScope.started = true;
                $rootScope.timeStarted = new Date();
            }else{
                $rootScope.started = false;
                $rootScope.timeStarted = undefined;
                $scope.$broadcast('timer-stop');
            }
        }



        /*$rootScope.startTimer = function (){
         $rootScope.$broadcast('timer-start');
         $rootScope.timerRunning = true;
         $rootScope.timeStarted = new Date();
         };

         $rootScope.stopTimer = function (){
         $rootScope.$broadcast('timer-stop');
         $rootScope.timerRunning = false;
         };*/
    });
