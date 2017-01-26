angular.module('app')
  .controller('loginCtrl', function ($scope, userSrvc, $state) {

    $scope.test = 'again';
    $scope.localSignup = true;

    $scope.togglelogin = function () {

      $scope.localSignup = !$scope.localSignup;
      console.log($scope.localSignup);
    };
    $scope.createUserLocal = function (user) {
      userSrvc.createUser(user).then(function (response) {
        console.log(response.data);
      });
    };

    $scope.login = function (user) {
      userSrvc.login(user).then(function(r){
        if(!r.data){
          $state.go('userInfo');
        }
        else {
          $state.go('main');
        }
      });
    };

  });
