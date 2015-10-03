angular
.module('better-vbl')
.controller("clubsCtrl", ['$scope', '$rootScope', '$stateParams', 'vblDataService',
	function($scope, $rootScope, $stateParams, vblDataService) {

		$scope.clubDetailsLoading = true;
		$scope.club = {
			guid: $stateParams.clubGuid
		};

		initialize();

		function initialize () {
			vblDataService.getClub($scope.club.guid).then(
				vblDataLoadedCallback, vblDataErrorCallback
			);
		}

		function vblDataLoadedCallback (response) {
			$scope.clubDetailsLoading = false;
			$scope.club = response.data[0];

			$rootScope.$broadcast('navigation.pageTitle', $scope.club.naam);

			setTimeout(initializeComponents, 200);
			console.debug($scope.club);
		}
		function vblDataErrorCallback (response) {
			$scope.clubDetailsLoading = true;
			console.error(response);
		}

		function initializeComponents () {
	     	
	  	}

	}]);