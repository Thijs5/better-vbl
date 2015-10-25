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

  function addFavorite(type, team) {
    var favorites = getFavorites(type);
    var alreadyExists = false;

    for (var i = 0; i < favorites.length; i++) {
      var f = favorites[i];
      if (f.id == team.guid) {
        alreadyExists = true;
      }
    }

    if (!alreadyExists) {
      favorites.push({id: team.guid, name: team.name});
    }

    clientStorageService.set(getKey(type), favorites);
  }

  function removeFavorite(type, team) {
    var favorites = getFavorites(type);
    for (var i = 0; i < favorites.length; i++) {
      var f = favorites[i];
      if (f.id == team.guid) {
        favorites.splice(i, 1);
      }
    }

    clientStorageService.set(getKey(type), favorites);
  }

  function toggleFavorite(type, team) {
    var favorites = getFavorites(type, team);
    var newFavorites = [];
    var addToFavorites = true;

    for (var i = 0; i < favorites.length; i++) {
      var f = favorites[i];
      if (f.id == team.guid) {
        removeFavorite(type, team);
        addToFavorites = false;
      } else {
        newFavorites.push(f);
      }
    }

    if (addToFavorites) {
      addFavorite(type, team);
    }
  }

  function isFavorite(type, team) {
    var favorites = getFavorites(type);

    for (var i = 0; i < favorites.length; i++) {
      var fav = favorites[i];
      if (fav.id == team.guid) {
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
