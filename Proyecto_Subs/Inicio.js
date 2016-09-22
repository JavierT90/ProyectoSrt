var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var exec = require('child_process').exec;
//var execSync = require('exec-sync');
var MsTranslator = require('mstranslator');
fileSystem = require('fs'),
path = require('path');
var body_parser   = require('body-parser');
var multipart = require('connect-multiparty');

      var mongoose = require('mongoose');

      mongoose.connect('mongodb://localhost/test');
      
       var cats = mongoose.model('cats', { name: String, idioma: String,text:String});

app.use(body_parser());

app.use(multipart());


server.listen(8080);

var client = new MsTranslator({
        client_id: "772661829323321212",
        client_secret: "gepZTKt3yjyLCW0uqRkYOA1+BhEip/eKtaVNdo8n2Uk="
    }, true);

app.get('/',
    function(req,res)
    {
        res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/cliente.html");
    }
);

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
   var is = fs.createReadStream(path)
   var os = fs.createWriteStream(newPath)
   is.pipe(os)
   is.on('end', function() {
      //eliminamos el archivo temporal
      fs.unlinkSync(path)
   })
   res.send('¡archivo subido!')
})

//_________________________
app.get('/listarSub',
    function(req,res)
    {
      res.sendFile("C:/Users/Skrillfer/Documents/git/ProyectoSrt/Proyecto_Subs/MostrarSubtitulos.html");               
    }
);




/*
//Enviando la lista de archivos 
var listener = io.listen(server);
listener.sockets.on('connection', function(socket){

       
       console.log('variable creada');
       cats.find({}, function(err, docs) {
          if (!err){
              socket.emit('datarecibida', 'hola');//{'message': "hola mundo"}
              console.log(docs);
              mongoose.connection.close();

              //process.exit();
          } else {               
            mongoose.connection.close();
throw err;}
       }); 

});

*/




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
              console.log(docs);
              mongoose.connection.close();

              //process.exit();
          } else {               
            mongoose.connection.close();
throw err;}
       });

});


socket.on('descargarSRT',function(data)
{
  archivoObjeto(function()
  {
  socket.emit("descargaAuth","Hecho!");
  });
});


socket.on('traducir', function(data){
  //        console.log(data);
          params=data;
          hacerListaSRT();
          socket.emit("traducido","hecho")
        });
socket.on('traducirR',function(data)
{
  genint=0;
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
  var texto = fs.readFileSync(filePath, 'utf8');
  textoSplit = texto.split("\n");
  for(x=0; x<textoSplit.length;x=x+4){
    var num=textoSplit[x];
    var tiempos=textoSplit[x+1].split(">");
    var inicio=(tiempos[0]).substring(0,(tiempos[0]).length-2).trim();
    var fin=(tiempos[1]).trim();
    var contenido=textoSplit[x+2];


    list.push({ numero: num, tinicio: inicio, tfinal: fin, texto: contenido });

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