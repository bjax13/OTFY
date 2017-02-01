angular.module('app')
  .controller('rxInputCtrl', function ($scope, rxSrvc ) {
    $scope.test = rxSrvc.test;

    $scope.detailsToggle = true;

    // $scope.toggleDetails = () =>{
    //    $scope.detailsToggle = !$scope.detailsToggle;
    //    console.log($scope.detailsToggle);
    //
    // };

    $scope.getProducts = function () {

      rxSrvc.populateProductList().then(function (response) {
        $scope.products = response.data;
        console.log(response.data);
      });
    };

    $scope.getProducts();



  });
