angular
  .module('better-vbl')
  .controller("gamesCtrl", ['$scope', '$rootScope', '$stateParams', 'vblDataService',
    function($scope, $rootScope, $stateParams, vblDataService) {

    var vblData = {};
    $scope.team = {
      guid: $stateParams.teamGuid
    };
    $scope.isLoadingData = false;

    initialize();
    // setTimeout(initialize, 5000);

    function initialize () {
      vblDataService.matchesByTeam($scope.team.guid).then(
        vblDataLoadedCallback, vblDataErrorCallback
      );
    }
    function initializeComponents () {
      $('.ui.dropdown').dropdown({
        on: "hover"
      });
    }

    function vblDataLoadedCallback (response) {
      $scope.isLoadingData = true;
      $scope.team.name = response.data[0].naam;
      $scope.team.games = response.data[0].wedstrijden;
      $scope.team.poule = response.data[0].poules[0].naam;
      $scope.rankings = response.data[0].poules[0].teams;

      $rootScope.$broadcast('navigation.pageTitle', $scope.team.name);

      setTimeout(initializeComponents, 200);
    }
    function vblDataErrorCallback (response) {
      $scope.isLoadingData = true;
      console.error(response);
    }

    function toDate(dateString) {
      var parts = dateString.split('-');
      var d = parts[0];
      var m = parts[1];
      var y = parts[2];
      return new Date(y,m-1,d);
    }
    $scope.toDate = toDate;

    function printDate (dateString) {
      var date = toDate(dateString);
      return getDayNl(date).substr(0, 2) + " " + d + " " + getMonthNl(date);
    }
    $scope.printDate = printDate;

    function trimmedTeamName (teamName) {
      return teamName.substr(0, teamName.length-6);
    }
    $scope.trimmedTeamName = trimmedTeamName;

    function trimmedSportshall (sportshall) {
      var parts = sportshall.split(',');
      if (parts.length > 1) {
        return parts[0];
      } else {
        return sportshall;
      }
    }


    function getDayNl (date) {
      var day = date.getDay();
      var days = ["zondag",
                  "maandag",
                  "dinsdag",
                  "woensdag",
                  "donderdag",
                  "vrijdag",
                  "zaterdag"];
      return days[day];
    }
    $scope.getDayNl = getDayNl;

    function getMonthNl (date) {
      var month = date.getMonth();
      var months = ["januari",
                    "februari",
                    "maart",
                    "april",
                    "mei",
                    "juni",
                    "juli",
                    "augustus",
                    "september",
                    "oktober",
                    "november",
                    "december"];
      return months[month];
    }
    $scope.getMonthNl = getMonthNl;


    function downloadCalendar () {
      var cal = ics();

    	for (var i = 0; i < $scope.team.games.length; i++) {
    		var game = $scope.team.games[i];

        var eventName = game.teamThuisNaam + ' vs ' + game.teamUitNaam;
        var eventDescription = '';
        var eventLocation = game.accommOmschr;

        var dateParts = game.datumString.split('-');
        var timeParts = game.beginTijd.split('.');
        var startDateTime = new Date(dateParts[2], parseInt(dateParts[1])-1, dateParts[0], timeParts[0], timeParts[1], 0, 0);
        var endDateTime = addHours(startDateTime, 2);

        cal.addEvent(eventName, eventDescription, eventLocation, startDateTime, endDateTime);
    	};

    	window.open( "data:text/calendar;charset=utf8," + escape(cal.calendar()));
    }
    $scope.downloadCalendar = downloadCalendar;

    function isHomeGame(game) {
      return game.teamThuisNaam == $scope.team.name;
    }
    $scope.isHomeGame = isHomeGame;

    function isVictory(game) {
      if (game.uitslag == "") return false;

      var scoreParts = game.uitslag.split('-');
      var scoreHome = scoreParts[0].match(/\d+/)[0];
      var scoreAway = scoreParts[1].match(/\d+/)[0];


      // var scoreParts = game.uitslag.replace('- ', '-').match(/[\d]+-[\d]+/)[0].split('-');
      // var scoreHome;
      // var scoreAway;
      if (scoreParts.length > 1) {
        scoreHome = scoreParts[0].trim();
        scoreAway = scoreParts[1].trim();

        if (isHomeGame(game) && parseInt(scoreHome) > parseInt(scoreAway)) {
          return true;
        } else if (!isHomeGame(game) && parseInt(scoreHome) < parseInt(scoreAway)) {
          return true;
        } else {
          return false;
        }
      }

      return false;
    }
    $scope.isVictory = isVictory;

    function shortenTeamName(teamName) {
      return teamName
        .replace(/[\s]{1}[a-zA-Z]{3}[\s]{1}[a-zA-Z]{1}$/g, '');
    }
    $scope.shortenTeamName = shortenTeamName;

    function getOpponent(game) {
      if (isHomeGame(game)) {
        return game.teamUitNaam;
      } else {
        return game.teamThuisNaam;
      }
    }
    $scope.getOpponent = getOpponent;

    function createGoogleMapsLink(accommOmschr) {
      var sportshall = accommOmschr.substr(0, accommOmschr.lastIndexOf(','));

      var url = "https://www.google.be/maps/search/__accommOmschr__";
      var filledIn = url.replace("__accommOmschr__", sportshall);
      return filledIn;

    }
    $scope.createGoogleMapsLink = createGoogleMapsLink;

    function hasScore (game) {
      return game.uitslag != "";
    }
    $scope.hasScore = hasScore;

    // Creates a new date object with hours added.
    function addHours(date, h) {
    	var copy = new Date(date.getTime());
    	copy.setTime(copy.getTime() + h * 60 * 60 * 1000);
    	return copy;
    }
  }]);
