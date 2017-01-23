angular.module('app')
  .controller('addressInputCtrl', function ($scope,addressSrvc) {
    $scope.test = addressSrvc.test;


    $scope.initialize = addressSrvc.initialize;


    $scope.geolocate = addressSrvc.geolocate;



  });
