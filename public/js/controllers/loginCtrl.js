angular.module('app')
  .controller('loginCtrl', function ($scope) {

    $scope.test = 'again';
    $scope.localSignup = true;

    $scope.togglelogin = function () {

      $scope.localSignup = !$scope.localSignup;
      console.log($scope.localSignup);
    };

  });
