var app = angular.module('better-vbl');

app.service('vblDataService', ['$http', function ($http) {

  function matchesByTeam(teamGuid) {
    var url = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/matchesbyteamguid?teamGuid=__teamGuid__'
      .replace(/__teamGuid__/g, guid);
    return $http.get(url);
  }

  return {
    matchesByTeam: matchesByTeam
  }
}]);
