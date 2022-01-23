var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var ans = Math.floor(Math.random() * 10);

var socks = [];

net.createServer(function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    socks.push(sock)
    let name = ''
    console.log(socks.length)
    sock.on('data', function (data) {
        name = data.toString()
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        console.log(socks[0].destroyed)
        sock.write('You said "' + data + '"');
        if(data.toString() == ans.toString()){
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