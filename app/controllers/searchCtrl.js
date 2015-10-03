angular
  .module('better-vbl')
  .controller("searchCtrl", ['$scope', '$rootScope', 'vblDataService',
    function($scope, $rootScope, vblDataService) {

      initialize();
      $scope.teamsLoaded = false;

      function initialize() {
        $rootScope.$broadcast('navigation.pageTitle', 'Zoeken');
        vblDataService.getAllTeams().then(
          vblDataLoadedCallback, vblDataErrorCallback
        );

        $('.ui.dropdown').dropdown();
        $('.ui.accordion').accordion();
      }

      function vblDataLoadedCallback (response) {
        $scope.teamsLoaded = true;
        $scope.teams = response.data;
      }

      function vblDataErrorCallback (response) {
        $scope.teamsLoaded = true;
        console.error(response);
      }

  }]);
