angular
  .module('better-vbl')
  .controller("menuCtrl", ['$scope', 'vblDataService', function($scope, vblDataService) {

    $scope.pageTitle = "Zoeken";

    $scope.$on('navigation.team', handleNavigationToTeam);

    function handleNavigationToTeam (event, mass) {
      $scope.pageTitle = shortenTeamName(mass.name.trim());
    }

    function shortenTeamName(teamName) {
      return teamName
        .replace(/[\s]{1}[a-zA-Z]{3}[\s]{1}[a-zA-Z]{1}$/g, '');
    }
    $scope.shortenTeamName = shortenTeamName;
  }]);
