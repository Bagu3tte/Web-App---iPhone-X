angular.module('app')
  .controller('AppController', ['$scope', '$state', '$rootScope', '$interval', function ($scope, $state, $rootScrope, $interval) {
    var tick = function() {
     $scope.date = Date.now();
   }
   tick();
   $interval(tick, 60000);
  }]);
