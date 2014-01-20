var dict = {
	
	lang: 'pt-BR',

	commands: {

		'map': {

			address: 'geo:0,0?q={0}',

			expressions: [
				'mapa de %s',
				'mostrar mapa de %s',
			]
		},

		'browser': {

			address: 'http://{0}',

			expressions: [
				'abrir site %s',
				'navegador %s',
				'abrir url %s',
				'navegador %s',
				'chrome %s'
			]
		},

		'google': {

			address: "https://www.google.com/search?q=%s",

			expressions: [
				'google %s',
				'pesquisar %s',
				'busca %s',
				'buscar %s'
			]
		},

		'netflix': {

			address: 'http://netflix.com',

			expressions: [
				'netflix'
			]
		},

		'netflix_search': {

			address: 'http://movies.netflix.com/WiSearch?raw_query=&v1={0}&search_submit=',

			expressions: [
				'netflix %s',
				'assistir %s'
			]
		}
	}
}