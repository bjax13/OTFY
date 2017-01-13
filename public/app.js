angular.module('app',['ui.router'])
 .config(function ($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('/');

   $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './views/home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: './views/about.html'
      })
      .state('other', {
        url: '/other',
        templateUrl: './views/other.html'
      });

 });
