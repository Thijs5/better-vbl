angular.module('better-vbl')
.service('clientStorageService', function () {

  function get(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return {
    get: get,
    set: set
  }
});
