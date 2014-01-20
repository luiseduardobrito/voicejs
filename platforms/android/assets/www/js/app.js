var voiceApp = angular.module('voiceApp', [
	'ngRoute',
	'voiceApp.controllers',
	'voiceApp.services',
	'voiceApp.directives',
]);

voiceApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				controller: 'HomeCtrl',
				templateUrl: 'views/home.html'
			})

			.otherwise({
				redirectTo: "/"
			})

		$locationProvider.html5Mode(false)
		$locationProvider.hashPrefix('!');
	}
])