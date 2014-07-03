'use strict';

/**
 * @ngdoc overview
 * @name anCheckoutApp
 * @description
 * # anCheckoutApp
 *
 * Main module of the application.
 */
angular
  .module('anCheckoutApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });
