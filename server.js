var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var socks = [];

net.createServer(function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    socks.push(sock)
    console.log(socks.length)
    sock.on('data', function (data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        sock.write('You said "' + data + '"');
        if(data.toString() == '1'){
            socks.forEach((e)=> e.write('yesssss'))
        }
    });

    sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

    sock.on('error', function(err){
        sock.destroy() //terminated
    })

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);