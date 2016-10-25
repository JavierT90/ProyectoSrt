$(function() {
    var socket = io();


    $("#btn").click(function()
            {
              var parametros={text:"hateful love",from:"en",to:"es"}
              socket.emit('traducir',parametros);
            });
    $("#btn_descargar").click(function()
            {
                socket.emit("descargarSRT","Vamooos!");
            });

    $("#btn_1").click(function()
            {
              var t=$("#entrada").val();
              var f=$("#combobox_origen").val();
              var d=$("#combobox_destino").val();
              console.log(t+" "+" "+f+" "+d);
              var parametros={text:t,from:f,to:d}
              socket.emit('traducirR',parametros)
            });
    $("#btn_traducir").click(function()
            {
              var t=$("#entrada").val();
              var f=$("#combobox_origen").val();
              var d=$("#combobox_destino").val();
              console.log(t+" "+" "+f+" "+d);
              var parametros={text:t,from:f,to:d}
              socket.emit('traducir',parametros)

            });
    $("#btn_g").click(function()
            {

              socket.emit('GuardarEnMongo');
            });
    $("#btn_registrar").click(function()
            {
              var match=0;
              for (var i = 1; i <= 6; i++) {
                  var tmp=$("#Rg"+i).val()
                  if(tmp){
                    match++;
                  }
              };

              if(match==6){
                var a=$("#Rg1").val();
                var b=$("#Rg2").val();
                var c=$("#Rg3").val();
                var d=$("#Rg4").val();
                var e=$("#Rg5").val();
                var f=$("#Rg6").val();


                if(e==f){ //verficando match entre password
                  var parametros={nombre:a,apellidos:b,nickname:c,email:d,password:e};
                  socket.emit('registrar',parametros);

                }else{alert("confirmacion de contrasena erronea");}

              }else{
                alert("LLENA TODOS LOS CAMPOS");
              }
            });
    $("#btn_entrar").click(function()
          {
            var ok=0;
            for (var i = 1; i <= 2; i++) {
               var tmp=$("#Lg"+i).val();
               if(tmp){
                ok++;
               }
            };
            if(ok==2){
              var a=$("#Lg1").val();
              var b=$("#Lg2").val();
              //var parametros={nickname:a,password:b};
              $.post("http://localhost:8080/login",{email:a,pass:b},function(data){
                if(data==='done')
                {
                    window.location.href="/admin";
                }
              });
              //socket.emit('login',parametros);
            } else{
              alert("LOGIN: Debes Completar Todos Los Campos!!!");
            }
          });
    $("#btn_limpiar").click(function()
            {
              _clean();
            });

    function _clean(){
      for (var i = 1; i <= 6; i++) {
                  $("#Rg"+i).val("")
      };
    }
    //---------
    $(document).ready(function(){
        $('a').bind('click', function(e) {
          var url = $(this).attr('href');
          $.ajax({url,success:function(result){
            /*if(url=="/listarSub"){
              //alert(url);
            }*/

            $("").html(result);
          }});
        });
    });

    //---------
    socket.on('traducido', function (data) {
        console.log(data);
        $("#salida").val(data);
      });

    socket.on('descargaAuth', function (data) {
          window.open("http://localhost:8080/download");
        });

    socket.on('listarRespuesta', function (data) {
          window.open("http://localhost:8080/listarSub");
        });

//------------------------------Socket que recibe la data de Subtitulos en BD
    socket.on('datarecibida', function (data) {
          console.log(data);

      var person = data;

      var text = "<br><br> "
      text +="<table align=\"center\"  WIDTH=300>";
      var x;

      text+="<tr><th>Nombre</th><th>Idioma</th><th>Editar</th></tr>"
      for (x in person) {
          text+="<tr>";
          text +="<td>"+ person[x].name+"</td> \n";
          text +="<td>"+ person[x].idioma+"</td> \n";
          text +="<td > <form method=\"post\" action=\"/vajararchibo\"><input type='text' name='qualkiermierda' value=\""+person[x]._id+"\"><input type='submit' padding: \'10px 20px 10px 20px\';></input> </form></td> \n";
          text+="</tr>";
      }

      text+="</table>";


      $('#div1').append(text);

      });

//-------------------------------------Socket que recibe la session
socket.on('sessionRecibida', function (data) {

    var persona=data;
    if(data=='nada'){
      var elementExists = document.getElementById("registro");

      if(typeof(elementExists) == 'undefined' && elementExists == null){
          var text=  "<li id=\"registro\"><a href=\"/registro\">Login/Registrar</a></li>";
          $('#menulista').append(text);
      }
    }else{
      $('#registro').remove();
      var text="<li id=\"bienvenido\"><a >Bievenido "+data+"</a></li>";
      text+="<li id=\"logout\"><a href=\"/logout\">Cerra Sesion</a></li>";

      $('#menulista').append(text);
    }
});
//--------------------------------------Socket de Registro(server-->cliente)
      socket.on('resp_registro', function (data){
        if(data=='error'){
          alert("Usuario No Disponible Intenta con Otro");
          var valor="";
          $("#nickname").val(valor);
        }else{
          _clean();
          alert("Has Sido Registrado");
        }

      });
//--------------------------------------Socket de Login(server-->cliente)
      socket.on('resp_login',function (data){
        if(data=='exito'){
          alert('Has iniciado sesion correctamente');
          window.location.href="/admin";
        }else{
          alert('nickname/password incorrectos');
        }
      });
});
