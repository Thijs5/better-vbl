var app = angular.module('better-vbl');

app.service('vblDataService', ['$http', function ($http) {

  function matchesByTeam(teamGuid) {
    var url = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamMatchesByGuid?teamGuid=__teamGuid__'
      .replace(/__teamGuid__/g, teamGuid);
    return $http.get(url);
  }

  function getTeamDetails(teamGuid) {
    var url = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/TeamDetailByGuid?teamGuid=__teamGuid__'
      .replace(/__teamGuid__/g, teamGuid);
    return $http.get(url);
  }

  function getAllTeams() {
    var url = "http://vblcb.wisseq.eu/VBLCB_WebService/data/Clubs?p=1";
    return $http.get(url);
  }

  function getClub (clubGuid) {
    var url = 'http://vblcb.wisseq.eu/VBLCB_WebService/data/teamsByClubGuid?issguid=__clubGuid__'
      .replace(/__clubGuid__/g, clubGuid);
    return $http.get(url);
  }

  return {
    matchesByTeam: matchesByTeam,
    getTeamDetails: getTeamDetails,
    getAllTeams: getAllTeams,
    getClub: getClub
  }
}]);
