angular
  .module('better-vbl')
  .controller("gamesCtrl", ['$scope', '$stateParams', 'vblDataService', function($scope, $stateParams, vblDataService) {

    var vblData = {};
    $scope.team = {
      guid: $stateParams.teamGuid
    };
    $scope.isLoadingData = false;

    initialize();
    // setTimeout(initialize, 3000);

    function initialize () {
      vblDataService.matchesByTeam($scope.team.guid).then(
        vblDataLoadedCallback, vblDataErrorCallback
      );
    }

    function vblDataLoadedCallback (response) {
      $scope.isLoadingData = true;



      console.log(response);
    }
    function vblDataErrorCallback (response) {
      $scope.isLoadingData = true;
      console.error(response);
    }
  }]);
