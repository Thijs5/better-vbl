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
        .replace(/[\s]{1}[a-zA-Z]{3}[\s]{1}[a-zA-Z]{1}$/g, '');
    }
    $scope.shortenTeamName = shortenTeamName;

    function toggleSidebar() {
      $('.button-collapse').sideNav('show');
    }
    $scope.toggleSidebar = toggleSidebar;
  }]);
