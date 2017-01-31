angular.module('app')
  .controller('rxInputCtrl', function ($scope, rxSrvc ) {
    $scope.test = rxSrvc.test;


    $scope.getProducts = function () {

      rxSrvc.populateProductList().then(function (response) {
        $scope.products = response.data;

      });
    };

    $scope.getProducts();



  });
