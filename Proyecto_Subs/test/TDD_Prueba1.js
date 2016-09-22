var expect = require('chai').expect;
var request = require('superagent');

describe('Pagina Mostrar Subtitulos', function() {
	var baseUrl = 'http://localhost:8080'
	describe('Cuando se solicite el sitio MostrarSubtitulos',function(){
		it('deberia obtener al menos un archivo traducido de la base de datos de mongo DB ',function(done){
			//Función esperada para que se cumpla la prueba
			request.get(baseUrl + '/traducir?texto=hello%20world&idiomaorigen=en&idiomadestino=es').end(function assert(err,res){
				expect(err).to.not.be.ok;
				expect(res).to.have.property('status',200);
        expect(res.text).to.equal('hola mundo');
				done();
			});

		});
	});
});
