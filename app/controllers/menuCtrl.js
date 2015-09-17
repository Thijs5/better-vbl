angular
  .module('better-vbl')
  .controller("menuCtrl", ['$scope', 'vblDataService', function($scope, vblDataService) {

    $scope.pageTitle = "Zoeken";

    $scope.$on('navigation.team', handleNavigationToTeam);

    function handleNavigationToTeam (event, mass) {
      $scope.pageTitle = mass.name
    }
  }]);
