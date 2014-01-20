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

		return window.cordova.exec(
			_this.successCallback, 
			_this.errorCallback, 
			"SpeechRecognizer", 
			"startRecognize", 
			opt
		);
	}

	_this.successCallback = function(result) {

		if(_this.currentCallback)
			_this.currentCallback(null, result)

		_this.currentCallback = null;
	}

	_this.errorCallback = function(err) {

		if(_this.currentCallback)
			_this.currentCallback(err, null)

		_this.currentCallback = null;
	}

	return _this.init();
})

voiceServices.factory('intentHandler', function(){

	var _this = this;
	var _public = {};

	_this.init = function(){
		return _public;
	}

	_public.startActivity = function(addr, fn) {

		return window.plugins.webintent.startActivity(

			{
				action: window.plugins.webintent.ACTION_VIEW,
				url: addr
			},

			fn || function(){},
			function() {
				alert('Failed to open URL via Android Intent')
			}
		);
	}

	return _this.init();
})

voiceServices.factory('commandHandler', [

	'voiceHandler', 'intentHandler',

	function($voice, $intent){

		var _this = this;
		var _public = {};

		_this.dict = window.dict;

		_this.init = function(){
			return _public;
		}

		_this.run = function(cmd, fn) {

			fn = fn || function(){};

			return $intent.startActivity(cmd, fn);
		}

		_this.format = function(input, params) {

			if(toString.call(params) !== toString.call([]))
				params = [params];

			return (new String()).format.apply(input, params)
		}

		_public.getLanguage = function() {
			return _this.dict.lang;
		}

		_public.interpret = function(str, fn) {

			var map = _this.dict.commands;

			for(var k in map) {

				var exp = map[k].expressions;

				for(var i = 0; i < exp.length; i++) {

					var matches = sscanf(str, exp[i]);

					if((matches && matches.length) || exp == str) {

						if(matches.length && !matches[0])
							continue;

						console.log("Running '" + k + "' command");

						var addr = _this.format(map[k].address, matches);

						console.log("addr: " + addr)
						_this.run(addr, fn)
						return true;
					}
				}
			}

			return null;
		}

		return _this.init();
	}
])