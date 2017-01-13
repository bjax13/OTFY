angular.module('app')
  .directive('navBar', function () {
    return {
      restrict: 'E',
      templateUrl: "./js/directives/templates/navTpl.html"
    };
  });
