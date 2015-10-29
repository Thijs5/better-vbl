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
    .state('club', {
      url: "/clubs/:clubGuid",
      templateUrl: "app/views/clubDetails.html",
      controller: 'clubsCtrl'
    })
    .state('team', {
      url: "/teams/:teamGuid",
      templateUrl: "app/views/team.html",
      controller: 'gamesCtrl'
    })
    .state('team.calendar', {
      url: '/kalendar',
      templateUrl: 'app/views/team.calendar.html',
    })
    .state('team.rankings', {
      url: '/klassement',
      templateUrl: 'app/views/team.rankings.html',
    });
}]);
