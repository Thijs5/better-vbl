angular
  .module('better-vbl')
  .controller("gamesCtrl", ['$scope', '$stateParams', 'vblDataService', function($scope, $stateParams, vblDataService) {
    console.log('gamesCtrl loaded with id ' + $stateParams.teamGuid);
  }]);
