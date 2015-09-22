'use-strict'

var app = angular.module('better-vbl', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html',
      controller: function ($rootScope) {
        $rootScope.$broadcast('navigation.pageTitle', 'Zoeken');
      }
    })
    .state('details', {
      url: "/teams/:teamGuid",
      templateUrl: "app/views/teamDetails.html",
      controller: 'gamesCtrl'
    });
}]);
