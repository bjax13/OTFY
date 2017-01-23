angular.module('app')
  .controller('addressInputCtrl', function ($scope,addressAutoFillSrvc) {
    $scope.test = addressAutoFillSrvc.test;


    $scope.initialize = addressAutoFillSrvc.initialize;

    $scope.geolocate = addressAutoFillSrvc.geolocate;

  });
