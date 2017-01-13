angular.module('app')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: "../views/navTpl.html"
    };
  });
