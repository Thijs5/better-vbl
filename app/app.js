'use-strict'

var app = angular.module('better-vbl', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html'
    })
    .state('details', {
      url: "/teams/:teamGuid",
      templateUrl: "app/views/teamDetails.html",
      controller: 'gamesCtrl'
    });
}]);


// Heren
// http://vblcb.wisseq.eu/VBLCB_WebService/data/matchesbyteamguid?teamGuid=BVBL1281HSE++1

// Reserven
// http://vblcb.wisseq.eu/VBLCB_WebService/data/matchesbyteamguid?teamGuid=BVBL1281HSE++2

// Dames
// http://vblcb.wisseq.eu/VBLCB_WebService/data/matchesbyteamguid?teamGuid=BVBL1281DSE++1
