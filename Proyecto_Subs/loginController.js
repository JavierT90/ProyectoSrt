var crypto = require('crypto'); //Inclu�mos el m�dulo encargado de la encriptaci�n del token

 

function controller(app, session) {

 

app.get('/login', function (req, res) { //Si accedemos al login mediante el m�todo GET renderizamos el formulario de login

    res.render('login.jade');

    }); 

 

app.post('/login', function (req, res) { //Si se accede por POST se recogen los datos para iniciar la sesi�n

 

    if(req.body.user == 'usr' && req.body.password == 'pepito') { //Se han "hardcodeado" los datos a modo de ejemplo

        var timestamp = new Date().getTime();

        var rand = Math.floor(Math.random()*11);

        var sessionId = crypto.createHash('md5').update(timestamp.toString()+rand.toString()).digest('hex'); //Generamos el Token

 

        session[sessionId] = timestamp; //Se almacena el token en un array

 

        res.writeHead(200, { //Si la validaci�n es correcta, se adjunta una cookie con el token en la respuesta

        'Set-Cookie':'sessionId='+sessionId+'; expires='+new Date(new Date().getTime()+86409000).toUTCString()

        });

        res.end("Successfully validated!\n");

        }

    else {

        res.writeHead(403);

        res.end("Authentication failure\n");

        }

    });

 

}

 

module.exports.controller = controller;
