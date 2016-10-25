var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var exec = require('child_process').exec;

var nombreultimoarchivo="";
var idiomafinal="";

var session = require('express-session');//SESSION

//var execSync = require('exec-sync');
var MsTranslator = require('mstranslator');
fileSystem = require('fs'),
path = require('path');
var body_parser   = require('body-parser');
var multipart = require('connect-multiparty');

      var mongoose = require('mongoose');
      mongoose.connect('mongodb://localhost/test');

      var dogs = mongoose.model('dogs', { nombre: String,apellidos: String,nickname: String,email: String,password: String});
      var cats = mongoose.model('cats', { name: String, idioma: String,text:String});

app.use(session({secret: 'ssshhhhh'}));//SESSION
app.use(body_parser());
app.use(multipart());




server.listen(8080);

var sess;




var client = new MsTranslator({
        client_id: "772661829323321212",
        client_secret: "gepZTKt3yjyLCW0uqRkYOA1+BhEip/eKtaVNdo8n2Uk="
    }, true);

    var sess;

app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
    res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/cliente.html");
}
});

app.get('/admin',function(req,res){
sess = req.session;
if(sess.email) {
  res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/cliente.html");
} else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href="/registro">Login</a>');
}
});
/*
app.get('/',
    function(req,res)
    {
        res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/cliente.html");
    }
);*/

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/Recursos/style.css');
});

app.get('/descargar.png', function(req, res){
  res.sendFile(__dirname + '/iconos/descargar.png');
});
app.get('/translate.png', function(req, res){
  res.sendFile(__dirname + '/iconos/translate.png');
});
app.get('/generar.png', function(req, res){
  res.sendFile(__dirname + '/iconos/generar.png');
});
app.get('/fondo.jpg', function(req, res){
  res.sendFile(__dirname + '/Recursos/fondo.jpg');
});


app.get('/socket.io-1.3.5.js',
    function(req,res)
    {
        res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/socket.io-1.3.5.js");
    }
);

app.get('/scripts.js',
    function(req,res)
    {
        res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/scripts.js");
    }
);
app.get('/traducir',
  function sendResponse(req,res)
  {
    var query={text:req.query.texto,
                from:req.query.idiomaorigen,
              to:req.query.idiomadestino}

    Traducir(query,function(Respuesta){
        res.status(200).send(Respuesta);
    });
  }
);

//[

//]

app.get('/download',
  function sendResponse(req,res)
  {
    var file = __dirname + '/traducido.srt';

    //archivoObjeto();
  res.download(file); // Set disposition and send it.
  }
);

app.post('/upload', function(req, res) {
   //El modulo 'fs' (File System) que provee Nodejs nos permite manejar los archivos
   var fs = require('fs')
   var path = req.files.archivo.path
   var newPath = 'temporal.srt'
   nombreultimoarchivo=req.files.archivo.originalFilename;
   console.log(req.files.archivo.originalFilename);

   var is = fs.createReadStream(path)
   var os = fs.createWriteStream(newPath)
   is.pipe(os)
   is.on('end', function() {
      //eliminamos el archivo temporal
      fs.unlinkSync(path)
   })
   res.send('¡archivo subido!')
})

app.get('/listarSub',
    function(req,res)
    {

     res.sendFile(__dirname + '/MostrarSubtitulos.html');

    }
);

/*

io.sockets.on('connection', function (socket) {
cats.find({}, function(err, docs) {
          if (!err){
              socket.emit('message', docs);
              console.log("hola!!!!");
              //socket.emit('datarecibida', docs);//{'message': "hola mundo"}
              //console.log(docs);
              //mongoose.connection.close();

          } else {
            mongoose.connection.close();
throw err;}
       });

});

*/

app.get('/acerca',
    function(req,res)
    {
      res.sendFile(__dirname + '/Acerca.html');
    }
);

app.get('/registro',
    function(req,res)
    {
      res.sendFile(__dirname + '/Registro.html');
    }
);

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

app.post("/vajararchibo", function (req, res) {
    console.log(req.body.qualkiermierda)
    cats.findOne({'_id':req.body.qualkiermierda},function(err,docs){
            if(!err){
                if(docs){
                  console.log(docs.name);

                  var fs = require('fs');
                  fs.writeFile(__dirname+"/"+docs.name, docs.text, function(err) {
                    if(err) {
                      return console.log(err);
                    }

                  console.log("The file was saved!");
                  });


                  console.log(docs.name);
                  var file = docs.name;
                  res.download(file);
                }else{

                }
            }else{
              throw err;
            }
    });



});




function Traducir(query,callback)
{
  console.log("Funcion Traducir");

    client.translate(query , function(err,data)
    {
      if(err)
      {
        console.log(err);
        callback(err);
      }
      else
      {
        callback(data.toLowerCase());
      }
    });
}

io.on('connection', function (socket) {
  socket.on('traducirF', function(data){
      console.log(data);
      params=data;
      client.translate(params , function(err,data)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          socket.emit("traducido",data);
        }
      });

    });




socket.on('listarSub',function(data)
{

  cats.find({}, function(err, docs) {
          if (!err){
              socket.emit('datarecibida', docs);//{'message': "hola mundo"}
              //console.log(docs);
          } else {
            mongoose.connection.close();
            throw err;}
  });

});


socket.on('GuardarEnMongo',function(data)
{
  var fs = require('fs');
  var path = require('path');
  var filePath = path.join(__dirname, '/traducido.srt');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (!err){

        //var mongoose = require('mongoose');
        //mongoose.connect('mongodb://localhost/test');
        //var Cat = mongoose.model('Cat', { name: String , text: String , idioma: String});
        var kitty = new cats({ name: nombreultimoarchivo , text:data, idioma:idiomafinal });
        kitty.save(function (err) {
        if (err) {
          console.log(err);

        } else {
          console.log('Guardado');

          }
        });
        //mongoose.connection.close();


              }else{
          console.log(err);
      }

  });

});

socket.on('verSession',function(data)
{

  if(sess.email){
    socket.emit('sessionRecibida', sess.email);//{'message': "hola mundo"}
  }else{
    socket.emit('sessionRecibida', 'nada');//{'message': "hola mundo"}
  }
  //res.write('<h1>Hello '+sess.email+'</h1>');


});


socket.on('registrar',function(data)
{
  console.log(data.nickname);
  dogs.findOne({'nickname':data.nickname}, function(err, docs) {
          if (!err){
              if(docs){
                socket.emit('resp_registro','error');
              }else{
                console.log("nickname disponible");
                    console.log("pass: "+data.password);
                    var newdog = new dogs({nombre: data.nombre, apellidos: data.apellidos, nickname: data.nickname, email: data.email,password: data.password});
                    newdog.save(function (err) {
                      if (err) {
                        console.log(err);
                        res.status(200).send("error al insertar");
                      } else {
                        socket.emit('resp_registro','exito');
                      }
                    });
              }

          } else {
            mongoose.connection.close();
            throw err;}
  });
});


app.post('/login',function(req,res){
  dogs.findOne({'nickname':req.body.email},function(err,docs){
          if(!err){
              if(docs){
                sess = req.session;
                //In this we are assigning email to sess.email variable.
                //email comes from HTML page.
                sess.email=req.body.email;
                res.end('done');
              }else{
                  socket.emit('resp_login','no exito');
              }
          }else{
            throw err;
          }
  });

});


app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

});
/*
socket.on('login',function(req,data){
  dogs.findOne({'nickname':data.nickname},function(err,docs){
          if(!err){
              if(docs){
                sess = req.session;
                sess.email=data.nickname;
                socket.emit('resp_login','exito');
              }else{
                  socket.emit('resp_login','no exito');
              }
          }else{
            throw err;
          }
  });
});*/

socket.on('descargarSRT',function(data)
{
  archivoObjeto(function()
  {
  socket.emit("descargaAuth","Hecho!");
  });
});


socket.on('traducir', function(data){
  //        conssole.log(data);
          params=data;
          hacerListaSRT();
          socket.emit("traducido","hecho")
        });
socket.on('traducirR',function(data)
{
  genint=0;
  idiomafinal=params.to;
  for (var j = 0; j < 2; j++) {
    for(var i=0;i<list.length;i++)
    {
      client.translate({text:(i+" @ "+list[i].texto),from:params.from,to:params.to} , function(err,data)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          var data1=data.split("@");
          otralista[data[0]]=data1[1];

          //otralista[genint]=data;

          //console.log(data);
          socket.emit("traducido",data);
        }
      });
    }
  }

});



});
var otralista=[];
var genint=0;
var params = {
            text: "",
            from: "",
            to: "",
            o:0
        };


var list=[];

function  hacerListaSRT(){

   filePath = 'temporal.srt';

  //this is sync way
  list.length = 0;
  var texto = fs.readFileSync(filePath, 'utf8');
  textoSplit = texto.split("\n");

  for(x=0; x<textoSplit.length;x=x+3){


      while(textoSplit[x].length==0){
          //console.log(textoSplit[x].length);

          x++;
          if(textoSplit[x]=="undefined" || textoSplit[x]==null){
              break;
          }
      }


      if(!(textoSplit[x]=="undefined") || !(textoSplit[x]==null)){
        var num=textoSplit[x];
        var tiempos=textoSplit[x+1].split(">");
        var inicio=(tiempos[0]).substring(0,(tiempos[0]).length-2).trim();
        var fin=(tiempos[1]).trim();
        var contenido=textoSplit[x+2];
/*
        console.log(num+"\n");
        console.log(inicio+"\n");
        console.log(fin+"\n");
        console.log(contenido+"\n");
*/
        list.push({ numero: num, tinicio: inicio, tfinal: fin, texto: contenido });

      }else{break;}



  }

  list[0].numero=1;
  //Recorriedno la lista


  //console.log(textoSplit[0].substring(2,3));

  //archivoObjeto();
//traducirtodo();
}




function archivoObjeto(callback){
  var stringfile="";

  for (var z = 0; z <list.length; z++) {
      stringfile+=list[z].numero+"\n";
      stringfile+=list[z].tinicio+" --> ";
      stringfile+=list[z].tfinal+"\n";
      //stringfile+=list[z].texto+"\n"+"\n";
      stringfile+=otralista[z]+"\n"+"\n";
  };

  fs.writeFile("traducido.srt", stringfile, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");

  });
  callback("Exito");
}


app.get('/pruebainsertar',
  function sendResponse(req,res)
  {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    var Cat = mongoose.model('Cat', { name: String });
    var kitty = new Cat({ name: 'gatito22' });
    kitty.save(function (err) {
    if (err) {
      console.log(err);
      res.status(200).send("error al insertar");
    } else {
      console.log('meow');
      res.status(200).send("insertado a mongo");
      }
});

  mongoose.connection.close();
  }
);
