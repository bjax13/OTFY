angular.module('app')
  .controller('rxInputCtrl', function ($scope, saveRxSrvc ) {
    $scope.test = saveRxSrvc.test;


    $scope.saveRx = saveRxSrvc.saveRx;


  });
