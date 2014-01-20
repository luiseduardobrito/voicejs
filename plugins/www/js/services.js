var voiceServices = angular.module('voiceApp.services', []);

voiceServices.factory('voiceHandler', function(){

	var _this = this;
	var _public = {};

	_this.maxMatches = 5;
	_this.promptString = "Diga um comando";
	_this.language = "pt-BR";

	_this.init = function(){
		return _public;
	}

	_public.startRecognition = function(fn) {

		var opt = [
			_this.maxMatches, 
			_this.promptString,
			_this.language
		];

		_this.currentCallback = fn;

		console.log(window.cordova)

		return window.cordova.exec(
			_this.successCallback, 
			_this.errorCallback, 
			"SpeechRecognizer", 
			"startRecognize", 
			opt
		);
	}

	_this.successCallback = function(result) {

		console.log("success")

		if(_this.currentCallback)
			_this.currentCallback(null, result)

		_this.currentCallback = null;
	}

	_this.errorCallback = function(err) {

		console.log("error")

		if(_this.currentCallback)
			_this.currentCallback(err, null)

		_this.currentCallback = null;
	}

	return _this.init();
})

voiceServices.factory('intentHandler', function(){

})