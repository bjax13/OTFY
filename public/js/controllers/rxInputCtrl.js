angular.module('app')
  .controller('rxInputCtrl', function ($scope, rxSrvc ) {
    $scope.test = rxSrvc.test;


    $scope.products = rxSrvc.getProducts();

    

  });
