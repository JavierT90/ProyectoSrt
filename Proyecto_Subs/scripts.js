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

    $("#btn_showSub").click(function()
            {
                socket.emit("listarSub","Vamooos!");
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
    socket.on('datarecibida', function (data) {
          console.log(data);

var person = data; 

var text = "<br><br> <h2 align=\"center\"> Lista De Subtitulos</h2>"
text +="<table align=\"center\" BORDER=1 WIDTH=300>";
var x;

for (x in person) {
    text+="<tr>";   
    text +="<td> Nombre:"+ person[x].nombre+"</td> \n";
    text +="<td> Idioma:"+ person[x].idioma+"</td> \n";
    text +="<td> Idioma:"+ person[x].text+"</td> \n";
    text+="</tr>";
}

text+="</table>";


$('#div1').append(text);

        });




});
