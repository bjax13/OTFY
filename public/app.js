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
        templateUrl: './views/login.html',
        controller: 'navBarCtrl'
      })
      .state('orderCL', {
        url: '/orderCL',
        templateUrl: './views/orderCL.html'
      })
      .state('orderCL.address', {
        url: '/address',
        templateUrl: './views/orderClSub/address.html',
        controller: 'addressInputCtrl'
      })
      .state('orderCL.selectBrand', {
        url: '/selectBrand',
        templateUrl: './views/orderClSub/selectBrand.html',
        controller: 'rxInputCtrl'
      })
      .state('orderCL.selectECP', {
        url: '/selectECP',
        templateUrl: './views/orderClSub/selectECP.html',
        controller: 'ecpInputCtrl'
      })
      .state('orderCL.checkout', {
        url: '/checkout',
        templateUrl: './views/orderClSub/checkout.html'
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
