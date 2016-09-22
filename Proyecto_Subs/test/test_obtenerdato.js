
var expect = require('chai').expect;
var request = require('superagent');

describe('Insertar base de datos', function() {
	var baseUrl = 'http://localhost:8080'
	describe('Cuando se inserte a la base de datos',function(){
		it('Se deberia obtener una cadena que confirme la insercion a la base de datos ',function(done){
			//Función esperada para que se cumpla la prueba
			request.get(baseUrl + '/pruebainsertar').end(function assert(err,res){
				expect(err).to.not.be.ok;
				expect(res).to.have.property('status',200);
        expect(res.text).to.equal('insertado a mongo');
				done();
			});

		});
	});
});