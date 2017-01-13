angular.module('app',['ui.router'])
 .config(function ($stateProvider, $urlRouterProvider) {

   $urlRouterProvider.otherwise('/');


   $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: './views/landingPage.html'
      })
      .state('main', {
        url: '/main',
        templateUrl: './views/main.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: './views/login.html'
      })
      .state('orderCL', {
        url: '/orderCL',
        templateUrl: './views/orderCL.html'
      })
      .state('scheduleEyeExamComingSoon', {
        url: '/scheduleEyeExamComingSoon',
        templateUrl: './views/scheduleEyeExamComingSoon.html'
      })
      .state('orderEWComingSoon', {
        url: '/orderEWComingSoon',
        templateUrl: './views/orderEWComingSoon.html'
      })
      .state('userInfo', {
        url: '/userInfo',
        templateUrl: './views/userInfo.html'
      });

 });
