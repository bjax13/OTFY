angular.module('app')
  .controller('navBarCtrl', function ($scope) {
    $scope.loggedIn = false;

    $scope.changeLoggin = function () {


      $scope.loggedIn = !$scope.loggedIn;
      console.log($scope.loggedIn);
    };

  });
