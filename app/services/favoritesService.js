angular.module('better-vbl')
.service('favoritesService', ['$rootScope', 'clientStorageService',
  function ($rootScope, clientStorageService) {

  // [
  //   {
  //     type: 'team',
  //     id: <id>,
  //     name: <name>,
  //   }
  // ]

  var key = "better-vbl.favorites._type_";

  function getKey(type) {
    var key = "better-vbl.favorites._type_";
    return key.replace('_type_', type);
  }

  function addFavorite(type, id) {
    if (!isFavorite(type, id)) {
      var favorites = client
    }
  }

  function removeFavorite(type, id) {

  }

  function toggleFavorite(type, id) {

  }

  function isFavorite(type, id) {
    var favorites = getFavorites(type);

    for (var i = 0; i < favorites.length; i++) {
      var fav = favorites[i];
      if (fav.id == id) {
        return true;
      }
    }

    return false;
  }

  function getFavorites(type) {
    return clientStorageService.get(getKey(type)) || [];
  }

  return {
    getFavorites: getFavorites,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
    toggleFavorite: toggleFavorite,
    isFavorite: isFavorite
  }
}]);
