angular.module('app')
  .controller('addressInputCtrl', function ($scope,addressAutoFillSrvc, saveAddressSrvc) {
    $scope.test = addressAutoFillSrvc.test;

    $scope.address = {
      addressSearch: null,
      streetNumber: null,
      route: null,
      locality: null,
      postalCode: null,
      administrativeAreaLevel1: null,
    };

    $scope.logAddress = saveAddressSrvc.logAddress;


    $scope.initialize = addressAutoFillSrvc.initialize;

    $scope.geolocate = addressAutoFillSrvc.geolocate;

  });
