'use-strict'

var app = angular.module('better-vbl', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/search.html',
      controller: 'searchCtrl'
    })
    .state('team', {
      url: "/teams/:teamGuid",
      templateUrl: "app/views/teamDetails.html",
      controller: 'gamesCtrl'
    })
    .state('club', {
      url: "/clubs/:clubGuid",
      templateUrl: "app/views/clubDetails.html",
      controller: 'clubsCtrl'
    });
}]);
