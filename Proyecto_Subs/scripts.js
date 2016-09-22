$(function() {
    var socket = io();
    $("#btn").click(function()
            {
              var parametros={text:"hateful love",from:"en",to:"es"}
              socket.emit('traducirF',parametros);
            });
    $("#btn_guardardb").click(function()
            {
                socket.emit("GuardarEnMongo");
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
    socket.on('traducido', function (data) {
        console.log(data);
        $("#salida").val(data);
      });
    socket.on('descargaAuth', function (data) {
          window.open("http://localhost:8080/download");
        });

});
