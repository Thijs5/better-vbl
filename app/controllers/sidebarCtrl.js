angular
  .module('better-vbl')
  .controller("sidebarCtrl", ['$scope', 'favoritesService', function($scope, favoritesService) {

    $scope.favorites = favoritesService.getFavorites('teams');
    $scope.$on('favorites.update', handleFavoritesUpdate);

    function handleFavoritesUpdate (event, mass) {
      $scope.favorites = favoritesService.getFavorites('team');
    }

  }]);
