angular.module('app')
  .controller('addressInputCtrl', function ($scope,addressAutoFillSrvc) {
    $scope.test = addressAutoFillSrvc.test;

    $scope.address = {
      addressSearch: ''
    };


    $scope.initialize = addressAutoFillSrvc.initialize;

    $scope.geolocate = addressAutoFillSrvc.geolocate;

  });
