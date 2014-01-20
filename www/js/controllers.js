var voiceControllers = angular.module('voiceApp.controllers', []);

voiceControllers.controller("HomeCtrl", [

	'$scope', 'voiceHandler',

	function($scope, $voice) {

		console.log("home")

		document.addEventListener("deviceready", function(){

			$voice.startRecognition(function(err, txt) {

				if(err)
					console.error(err)
				else
					console.log(txt)
			})
		}, true);

		return null;
	}
])