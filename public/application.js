var mainApplicationModuleName = 'Review_App';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'ngMaterial', 'reviews']);

mainApplicationModule.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('grey');
});

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';