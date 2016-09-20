var expect = require('chai').expect;
var request = require('superagent');

describe('Conexion base de datos', function() {
	var baseUrl = 'http://localhost:8080'
	describe('Cuando se solicite la conexion a la base de datos',function(){
		it('Se deberia obtener una cadena que confirme la conexion a la base de datos ',function(done){
			//Función esperada para que se cumpla la prueba
			request.get(baseUrl + '/conexion').end(function assert(err,res){
				expect(err).to.not.be.ok;
				expect(res).to.have.property('status',200);
        expect(res.text).to.equal('ok');
				done();
			});

		});
	});
});
