angular.module('app')
  .controller('addressInputCtrl', function ($scope,addressAutoFillSrvc, saveAddressSrvc) {
    $scope.test = addressAutoFillSrvc.test;


    $scope.logAddress = saveAddressSrvc.logAddress;


    $scope.initialize = addressAutoFillSrvc.initialize;

    $scope.geolocate = addressAutoFillSrvc.geolocate;

  });
