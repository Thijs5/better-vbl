angular
  .module('better-vbl')
  .controller("menuCtrl", ['$scope', 'vblDataService', function($scope, vblDataService) {

    $scope.pageTitle = "VBL++";

    $scope.$on('navigation.pageTitle', handleNavigationToTeam);

    function handleNavigationToTeam (event, mass) {
      $scope.pageTitle = shortenTeamName(mass.trim());
    }

    function shortenTeamName(teamName) {
      return teamName
        // e.g. BBC Hoeilaart HSE A => BBC Hoeilaart
        .replace(/[\s]{1}[a-zA-Z]{3}[\s]{1}[a-zA-Z]{1}$/g, '')
        // e.g. Stella Artois Leuven Bears G12 A => Stella Artois Leuven Bears
        .replace(/[\s]{1}[a-zA-Z]{1}[\d]{2}[\s]{1}[a-zA-Z]/g, '');
    }
    $scope.shortenTeamName = shortenTeamName;

    function toggleSidebar() {
      $('.button-collapse').sideNav('show');
    }
    $scope.toggleSidebar = toggleSidebar;
  }]);
