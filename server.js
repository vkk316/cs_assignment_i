var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var ans = Math.floor(Math.random() * 10);

var socks = [];

net.createServer(function (sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    socks.push(sock)
    console.log(socks.length)
    sock.on('data', function (data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        if(data + "" == ans + ""){
            socks.forEach((e)=> e.write('the winner is ' + sock.remotePort))
            ans = Math.floor(Math.random() * 10);
        }else if(data + "" == "hey boi"){
            sock.write("noop")
        }else{
            sock.write("sorry dude")
            setTimeout(()=>sock.write("noop"), 2000)
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