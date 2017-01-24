angular.module('app')
  .controller('ecpInputCtrl', function ($scope,addressAutoFillSrvc, ecpSaveSrvc) {
    $scope.test = addressAutoFillSrvc.test;


    $scope.logAddress = ecpSaveSrvc.logAddress;


    $scope.initialize = addressAutoFillSrvc.initialize;

    $scope.geolocate = addressAutoFillSrvc.geolocate;

  });
