angular.module('app')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: "./views/directives/templates/navTpl.html",
      scope: {
      },
      controller: 'navBarCtrl'
    };
  });
