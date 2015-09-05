angular
  .module('better-vbl')
  .controller("gamesCtrl", ['$scope', '$stateParams', 'vblDataService', function($scope, $stateParams, vblDataService) {

    var vblData = {};
    $scope.team = {
      guid: $stateParams.teamGuid
    };
    $scope.isLoadingData = false;

    initialize();
    // setTimeout(initialize, 3000);

    function initialize () {
      vblDataService.matchesByTeam($scope.team.guid).then(
        vblDataLoadedCallback, vblDataErrorCallback
      );
    }

    function vblDataLoadedCallback (response) {
      $scope.isLoadingData = true;
      $scope.team.name = response.data[0].naam;
      $scope.team.games = response.data[0].wedstrijden;
      $scope.team.poule = response.data[0].poules[0].naam;
    }
    function vblDataErrorCallback (response) {
      $scope.isLoadingData = true;
      console.error(response);
    }

    function printDate (dateString) {
      var parts = dateString.split('-');
      var d = parts[0];
      var m = parts[1];
      var y = parts[2];
      var date = new Date(y,m-1,d);
      return getDayNl(date).substr(0, 2) + " " + d + " " + getMonthNl(date);
    }
    $scope.printDate = printDate;

    function getDayNl (date) {
      var day = date.getDay();
      var days = ["maandag",
                  "dinsdag",
                  "woensdag",
                  "donderdag",
                  "vrijdag",
                  "zaterdag",
                  "zondag"];
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

    function printScore (game) {

    }

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

    // Creates a new date object with hours added.
    function addHours(date, h) {
    	var copy = new Date(date.getTime());
    	copy.setTime(copy.getTime() + h * 60 * 60 * 1000);
    	return copy;
    }
  }]);
