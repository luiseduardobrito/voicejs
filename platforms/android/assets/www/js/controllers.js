var voiceControllers = angular.module('voiceApp.controllers', []);

voiceControllers.controller("HomeCtrl", [

	'$scope', 'voiceHandler', 'commandHandler',

	function($scope, $voice, $cmd) {

		$scope.listen = function() {

			if(!$scope.deviceReady)
				return;

			$voice.startRecognition(function(err, txt) {

				console.log(txt)

				if(!$cmd.interpret(txt[0])) {
					alert("Comando desconhecido")
				}
			})
		}

		document.addEventListener("deviceready", function(){

			$scope.$apply(function(){
				$scope.deviceReady = true;
			})

		}, true);

		return null;
	}
])